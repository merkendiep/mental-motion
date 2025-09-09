export interface NewsletterData {
  email: string;
  organization?: string;
  newsletters: string[];
}

export interface EventSignupData {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  event_id: string;
  event_title: string;
}

interface SheetConfig {
  apiUrl: string;
  apiKey?: string;
}

class SheetDBService {
  private configs: {
    newsletter: SheetConfig;
    eventSignups: SheetConfig;
  };

  constructor() {
    this.configs = {
      newsletter: {
        apiUrl: process.env.SHEETDB_NEWSLETTER_API_URL || "",
        apiKey: process.env.SHEETDB_NEWSLETTER_API_KEY,
      },
      eventSignups: {
        apiUrl: process.env.SHEETDB_EVENTS_API_URL || "",
        apiKey: process.env.SHEETDB_EVENTS_API_KEY,
      },
    };
  }

  private async makeRequest(sheetType: keyof typeof this.configs, data: any) {
    const config = this.configs[sheetType];

    if (!config.apiUrl) {
      throw new Error(`SheetDB API URL not configured for ${sheetType}`);
    }

    try {
      const response = await fetch(config.apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
        },
        body: JSON.stringify({
          data: [
            {
              ...data,
              timestamp: new Date().toISOString(),
              created_at: new Date().toLocaleString("nl-NL", {
                timeZone: "Europe/Amsterdam",
              }),
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `SheetDB API error for ${sheetType}:`,
          response.status,
          errorText
        );
        throw new Error(`SheetDB API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`SheetDB request failed for ${sheetType}:`, error);
      throw new Error(`Failed to submit to ${sheetType} sheet`);
    }
  }

  async submitNewsletter(data: NewsletterData) {
    // Map newsletters to separate columns
    const newsletterColumns = {
      newsletter_1: data.newsletters.includes("algemeen") ? "true" : "false",
      newsletter_2: data.newsletters.includes("evenementen") ? "true" : "false",
      newsletter_3: data.newsletters.includes("tips") ? "true" : "false",
    };

    return this.makeRequest("newsletter", {
      email: data.email,
      organization: data.organization || "",
      ...newsletterColumns,
      newsletter_count: data.newsletters.length,
      type: "newsletter",
    });
  }

  async submitEventSignup(data: EventSignupData) {
    return this.makeRequest("eventSignups", {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email.toLowerCase().trim(),
      mobile: data.mobile,
      event_id: data.event_id,
      event_title: data.event_title,
      signup_date: new Date().toISOString(),
      type: "event_signup",
    });
  }

  // Helper method to get data from a specific sheet (optional, for future use)
  async getData(
    sheetType: keyof typeof this.configs,
    filter?: Record<string, any>
  ) {
    const config = this.configs[sheetType];

    if (!config.apiUrl) {
      throw new Error(`SheetDB API URL not configured for ${sheetType}`);
    }

    let url = config.apiUrl;

    // Add search parameters if filter is provided
    if (filter && Object.keys(filter).length > 0) {
      const params = new URLSearchParams();
      Object.entries(filter).forEach(([key, value]) => {
        params.append(key, value.toString());
      });
      url += `/search?${params.toString()}`;
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
        },
      });

      if (!response.ok) {
        throw new Error(`SheetDB API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`SheetDB get data failed for ${sheetType}:`, error);
      throw new Error(`Failed to get data from ${sheetType} sheet`);
    }
  }
}

export const sheetDBService = new SheetDBService();
