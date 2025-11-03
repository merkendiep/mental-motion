"use client";

import React from "react";
import TransitionWithBorder from "@/src/components/TransitionWithBorder.jsx";

// Type definition for FAQ items
interface FAQItem {
  question: string;
  answer: string;
  links?: Record<string, string>;
}

// Function to parse text and convert configured words into links
const parseTextWithLinks = (
  text: string,
  links: Record<string, string> = {}
) => {
  if (!links || Object.keys(links).length === 0) {
    return (
      <span>
        {text.split("\n").map((line, index, array) => (
          <React.Fragment key={index}>
            {line}
            {index < array.length - 1 && <br />}
          </React.Fragment>
        ))}
      </span>
    );
  }

  const linkRanges: Array<{
    start: number;
    end: number;
    word: string;
    url: string;
  }> = [];

  // Find all link positions
  Object.entries(links).forEach(([word, url]) => {
    const regex = new RegExp(
      `\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
      "gi"
    );
    let match;

    while ((match = regex.exec(text)) !== null) {
      linkRanges.push({
        start: match.index,
        end: match.index + match[0].length,
        word: match[0],
        url: url,
      });
    }
  });

  // Sort by start position to process in order
  linkRanges.sort((a, b) => a.start - b.start);

  if (linkRanges.length === 0) {
    return (
      <span>
        {text.split("\n").map((line, index, array) => (
          <React.Fragment key={index}>
            {line}
            {index < array.length - 1 && <br />}
          </React.Fragment>
        ))}
      </span>
    );
  }

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;

  linkRanges.forEach((linkRange, index) => {
    // Add text before the link
    if (linkRange.start > lastIndex) {
      const textBeforeLink = text.substring(lastIndex, linkRange.start);
      elements.push(
        ...textBeforeLink.split("\n").map((line, lineIndex, lineArray) => (
          <React.Fragment key={`text-${index}-${lineIndex}`}>
            {line}
            {lineIndex < lineArray.length - 1 && <br />}
          </React.Fragment>
        ))
      );
    }

    // Add the link
    elements.push(
      <a
        key={`link-${index}`}
        href={linkRange.url}
        target={linkRange.url.startsWith("/") ? "_self" : "_blank"}
        rel={linkRange.url.startsWith("/") ? "" : "noopener noreferrer"}
        className="text-blue-600 hover:text-blue-800 underline"
      >
        {linkRange.word}
      </a>
    );

    lastIndex = linkRange.end;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex);
    elements.push(
      ...remainingText.split("\n").map((line, lineIndex, lineArray) => (
        <React.Fragment key={`remaining-${lineIndex}`}>
          {line}
          {lineIndex < lineArray.length - 1 && <br />}
        </React.Fragment>
      ))
    );
  }

  return <span>{elements}</span>;
};

const frequentlyAskedQuestions: FAQItem[] = [
  {
    question: "Student & zorgwijzer",
    answer:
      "Hier vind je alles wat voor jou van pas kan komen: van verzekeringen tot vrijwilligerswerk tot zingeving. Studentenzorgwijzer is pas echt een fijn en volledig overzicht van het aanbod in Utrecht.",
    links: {
      Studentenzorgwijzer: "https://studentenzorgwijzer.nl",
    },
  },
  {
    question: "Huisarts als eerste aanspreekpunt",
    answer:
      "De huisarts is het eerste aanspreekpunt in de zorg, waarbij je terecht kunt met al je vragen op medisch, psychisch en sociaal vlak. De huisarts kent de weg naar alle zorg- en hulpverleners in de buurt en kan je indien nodig goed doorverwijzen. Het is daarom belangrijk om een huisarts te hebben in de buurt waar je woont en/of studeert. Klik hier voor meer informatie",
  },
  {
    question: "Begeleiding vanuit onderwijsinstellingen",
    answer:
      "Voor zaken die te maken hebben met je studie of daar invloed op hebben (denk aan studievertraging, studiefinanciering, persoonlijke problemen of een chronische ziekte) kun je contact opnemen met de studieadviseur van je opleiding. Ook is er vaak een studentpsycholoog vanuit je onderwijsinstelling.",
  },
  {
    question: "Zorgverlening",
    answer:
      "Voel je je al langer niet goed in je vel zitten en heb je behoefte aan begeleiding vanuit de zorg? Je huisarts is je eerste aanspreekpunt. De huisarts kent de weg naar alle zorg- en hulpverleners in de buurt en kan je indien nodig goed doorverwijzen, bijvoorbeeld naar een POH. Kijk op thuisarts voor direct advies over je klachten. Denk je aan zelfdoding? Kijk dan op 113 zelfmoordpreventie.",
    links: {
      thuisarts: "https://www.thuisarts.nl",
      "113 zelfmoordpreventie": "https://www.113.nl",
    },
  },
  {
    question: "Psychologische zorg",
    answer:
      "Wanneer je gaat studeren, maak je veel veranderingen mee. Je gaat voor het eerst op jezelf wonen, wilt de vakken voor je studie halen en krijgt er zo nieuwe verantwoordelijkheden bij. Deze veranderingen en nieuwe indrukken kunnen gepaard gaan met gevoelens van stress en psychische klachten. Dit kan een grote invloed hebben op jouw dagelijks leven. Het is dan belangrijk om te weten waar je terecht kunt met deze klachten. Klik hier voor meer informatie",
  },
  {
    question: "113 Zelfmoordpreventie",
    answer:
      "113 Zelfmoordpreventie is de landelijke hulplijn waar mensen met zelfmoordgedachten naartoe kunnen bellen en chatten. Je kunt hier terecht als je gedachten hebt aan zelfmoord en hier anoniem met iemand over wilt praten. Praten kan opluchten en ruimte creëren om naar oplossingen te zoeken. Ook mensen die zich zorgen maken om iemand anders kunnen hier anoniem terecht om de situatie te bespreken en voor advies. De hulplijn is 24/7 anoniem bereikbaar via www.113.nl en 0800-0113. Kijk op de website van 113 Zelfmoordpreventie voor meer informatie.",
    links: {
      "www.113.nl": "https://www.113.nl",
      "113 Zelfmoordpreventie": "https://www.113.nl",
    },
  },
  {
    question: "Sociale ondersteuning",
    answer:
      "Iedereen heeft wel eens een periode waarin niet alles even soepel verloopt. Loop jij vast door bepaalde problemen of maak je je zorgen over een studiegenoot? Bij het buurtteam in je eigen wijk kun je terecht voor allerlei vragen over bijvoorbeeld je financiën, (faal)angst, verslaving of huisvesting. Klik hier voor meer informatie.",
  },
  {
    question: "Financiële ondersteuning",
    answer:
      "Als je gaat studeren verandert er veel op financieel gebied. Wat kost een studie? Hoeveel lenen is verstandig? Ga je op kamers of blijf je thuis wonen? Welke kosten komen daarbij kijken? Neem je wel of geen bijbaan? Als student krijg je met verschillende nieuwe geldzaken te maken. Het is belangrijk om een overzicht te hebben van jouw inkomsten en uitgaven. Er zijn verschillende instanties die jou bij jouw geldzaken kunnen ondersteunen. Klik hier voor meer informatie.",
  },
  {
    question: "Studeren met een functiebeperking of chronische ziekte",
    answer:
      "Studeren met een functiebeperking of chronische ziekte is vaak lastiger en kost meer tijd en energie dan studeren zonder die beperking, maar het hoeft geen belemmering te vormen voor het halen van een diploma. Denk hierbij aan studeren met visuele, auditieve of motorische beperkingen, dyslexie, AD(H)D of depressiviteit. Voor de belangen van deze studenten maken verschillende instanties zich hard en voor deze studenten zijn er verschillende voorzieningen beschikbaar. Het is belangrijk om tijdig de voorzieningen aan te vragen bij de start van jouw studie. Klik hier voor meer informatie.",
  },
  {
    question: "Middelen gebruik en verslaving",
    answer:
      "Je studententijd is een periode vol nieuwe ervaringen: Een nieuwe stad, opleiding, huis en verantwoordelijkheden. Voor veel studenten komen daar ook borrels, verenigingsavonden en feesten bij. Een nacht doorhalen om verder te komen in die game, met kater naar college of een ziekmelding vanwege een dinsdagdip is niet meteen problematisch. Maar wat als het vaker gebeurt dan je eigenlijk zou willen en het ten koste gaat van je studieresultaten? Of als je hierdoor voor een langere periode somber, angstig of gestresst bent? Mogelijk heb je je middelengebruik (of gamen of gokken) niet helemaal meer onder controle. Wat kun je dan doen? Klik hier voor meer informatie.",
  },
  {
    question: "De checkers",
    answer:
      "Maak je je zorgen om een ander en wil je die graag helpen. Kan je ook kijken op de pagina van De-checkers op deze pagina leer je in 3 korte modules hoe je anderen kan helpen, welke vragen je kan stellen en ook hoe je kan signaleren of het goed met iemand gaat.",
    links: {
      "De-checkers": "/de-peer",
    },
  },
  {
    question: "Organisaties & sociale basis",
    answer:
      "Net als MentalMotion zijn er nog veel meer andere mooie initiatieven die zich inzetten om het verschil te maken voor jonge mensen in Utrecht. Voelt reguliere zorg niet als de juiste plek, of moet je wachttijd overbruggen? Dan zijn deze organisaties misschien interessant voor jou.\n\nDe WachtVerzachter\nDe WachtVerzachter is er om wachttijd op professionele hulp te overbruggen. Je wordt gekoppeld aan een ervaringsdeskundige, en kunt meteen met iemand in gesprek die jouw situatie begrijpt. Meer informatie vind je op dewachtverzachter.nl.\n\nGeluksBV\nGeluksBV organiseert GeluksCafés speciaal voor jonge mensen. Hier staat samenzijn, positiviteit en zingeving centraal. Kijk op geluksbv.nl voor meer informatie.\n\nDe Checkers\nMaak je je zorgen om iemand in je omgeving? Kijk dan op De Checkers. Hier leer je in 3 korte modules hoe je anderen kan helpen, welke vragen je kan stellen en ook hoe je kan signaleren of het goed met iemand gaat.",
    links: {
      "dewachtverzachter.nl": "https://dewachtverzachter.nl",
      "geluksbv.nl":
        "https://geluksbv.nl/wat-we-doen/sociale-innovaties/gelukscafes/",
      "Kijk dan op De Checkers": "/de-peer",
    },
  },
];

const AboutUsPage = () => {
  return (
    <div className="flex flex-col bg-white">
      <section className={"pt-32 max-w-6xl mx-auto px-2 md:px-0"}>
        <div className="hero-content flex-col lg:flex-row-reverse mx-auto">
          <div className="text-center lg:text-center">
            <h1 className="text-3xl font-black text-gray-700 mb-8 uppercase md:text-6xl">
              <span>Hulpvraag</span>
            </h1>

            <p className={"mb-8"}>
              Waar kun je het beste terecht met je hulpvraag? Er is veel aanbod
              voor jonge mensen in Utrecht, zowel vanuit onderwijsinstellingen
              en zorgverlening als vanuit andere organisaties. Soms zie je door
              de bomen het bos niet meer. Daarom geven wij hieronder een kort
              overzicht van mogelijke ondersteuning voor studenten en
              jongvolwassenen in Utrecht.
            </p>
          </div>
        </div>

        {/* Accordion FAQ */}
        <div className={"mx-auto"}>
          {frequentlyAskedQuestions.map((item, index) => (
            <div
              key={index}
              className="collapse bg-base-100 border-base-300 border mb-2"
            >
              <input type="checkbox" />
              <div className="collapse-title font-semibold">
                {item.question}
              </div>
              <div className="collapse-content text-sm">
                {parseTextWithLinks(item.answer, item.links)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <TransitionWithBorder colorFrom={"bg-white"} colorTo={"bg-gray-900"} />
    </div>
  );
};

export default AboutUsPage;
