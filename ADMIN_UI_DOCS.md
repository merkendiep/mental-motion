# Admin Event Editing - UI Documentation

## Admin Login Page (`/admin/login`)

The admin login page provides a clean, centered login form:

```
┌─────────────────────────────────────────────┐
│                                             │
│           ┌─────────────────────┐           │
│           │   Admin Login       │           │
│           │                     │           │
│           │  Email:             │           │
│           │  [input field]      │           │
│           │                     │           │
│           │  Password:          │           │
│           │  [input field]      │           │
│           │                     │           │
│           │  [Sign In Button]   │           │
│           │                     │           │
│           └─────────────────────┘           │
│                                             │
└─────────────────────────────────────────────┘
```

Features:
- Clean, minimal design matching the app's aesthetic
- Email and password inputs
- Error messages displayed when login fails
- Redirects to `/events/edit` on success

## Event Edit Page (`/events/edit`)

The event edit page uses a two-column layout:

```
┌──────────────────────────────────────────────────────────────────┐
│  Edit Events                     Logged in as: admin@example.com │
│  Select an event to edit         [Sign Out]                      │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────┐  ┌────────────────────────────────────────┐│
│  │ Event List      │  │ Edit Event                             ││
│  │ ─────────────── │  │ ────────────────────────────────────── ││
│  │                 │  │                                        ││
│  │ ┌─────────────┐ │  │ Title: [input]                        ││
│  │ │ Event 1     │ │  │                                        ││
│  │ │ 2025-11-10  │ │  │ Date: [date picker]  Time: [input]    ││
│  │ └─────────────┘ │  │                                        ││
│  │                 │  │ Location: [input]                      ││
│  │ ┌─────────────┐ │  │                                        ││
│  │ │ Event 2     │ │  │ Description:                          ││
│  │ │ 2025-11-15  │ │  │ ┌────────────────────────────────┐   ││
│  │ └─────────────┘ │  │ │ [B][I][S] [H2][H3] [•][1.]     │   ││
│  │                 │  │ ├────────────────────────────────┤   ││
│  │ ┌─────────────┐ │  │ │                                 │   ││
│  │ │ Event 3     │ │  │ │ [Rich text content]             │   ││
│  │ │ 2025-11-20  │ │  │ │                                 │   ││
│  │ └─────────────┘ │  │ │                                 │   ││
│  │                 │  │ └────────────────────────────────┘   ││
│  │ ...             │  │                                        ││
│  │                 │  │ [Update Event]  [Cancel]              ││
│  └─────────────────┘  └────────────────────────────────────────┘│
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

### Left Panel - Event List
- Scrollable list of all events (past and future)
- Each event shows:
  - Event title
  - Date and time
- Selected event is highlighted with primary color
- Click to select and load event for editing

### Right Panel - Edit Form
When an event is selected:
- **Title field**: Text input for event title
- **Date field**: HTML5 date picker
- **Time field**: Text input (e.g., "11:00-13:00")
- **Location field**: Text input for location
- **Description field**: Rich text editor with toolbar
  - Formatting buttons: Bold, Italic, Strikethrough
  - Headings: H2, H3
  - Lists: Bullet, Numbered
  - Quote and Horizontal Rule
  - Undo/Redo
- **Update Event button**: Saves changes
- **Cancel button**: Clears selection
- Success/error messages shown above buttons

When no event is selected:
- Displays a placeholder message "No Event Selected"
- Instructions to select an event from the list

## Rich Text Editor Features

The Tiptap-based editor includes:

```
Toolbar: [B] [I] [S] | [H2] [H3] | [•List] [1.List] | ["Quote] [─] | [↶] [↷]
         │   │   │    │    │       │       │          │        │    │   │
         │   │   │    │    │       │       │          │        │    │   └─ Redo
         │   │   │    │    │       │       │          │        │    └───── Undo
         │   │   │    │    │       │       │          │        └────────── HR
         │   │   │    │    │       │       │          └───────────────── Quote
         │   │   │    │    │       │       └────────────────────────── Numbered
         │   │   │    │    │       └──────────────────────────────── Bullet
         │   │   │    │    └────────────────────────────────────── H3
         │   │   │    └───────────────────────────────────────── H2
         │   │   └─────────────────────────────────────────── Strike
         │   └──────────────────────────────────────────── Italic
         └────────────────────────────────────────────── Bold
```

## Security Flow

1. User navigates to `/events/edit`
2. Server checks authentication → if not authenticated → redirect to `/admin/login`
3. Server checks if user email is in `ADMIN_EMAILS` → if not → redirect to `/`
4. If authenticated and authorized → show edit interface
5. When updating event:
   - API checks authentication
   - API checks admin authorization
   - API validates input
   - API updates Supabase
   - Success/error returned to UI

## Design Notes

- Uses existing DaisyUI components and theme
- Matches Mental Motion's color scheme (teal/primary color)
- Responsive layout (stacks on mobile)
- Clear visual feedback for actions
- Loading states for async operations
- Error messages displayed inline
- Success messages with auto-refresh
