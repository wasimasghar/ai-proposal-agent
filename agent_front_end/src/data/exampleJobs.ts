export interface ExampleJob {
  label: string
  text: string
}

export const exampleJobs: ExampleJob[] = [
  {
    label: "Flutter delivery app",
    text: "We need an experienced Flutter developer to build a food delivery app. Must have live rider tracking on Google Maps, Firebase backend, Stripe payments and push notifications for order status. 3+ years of Flutter experience required. GraphQL and CI/CD (Codemagic) are a plus.",
  },
  {
    label: "SwiftUI fitness app",
    text: "Looking for an iOS developer to build a fitness tracking app in SwiftUI. It should sync workouts with HealthKit, show weekly progress charts and have a subscription paywall. 4+ years of iOS experience preferred.",
  },
  {
    label: "Android booking app",
    text: "Need a Kotlin developer to build a salon booking app with Jetpack Compose. Features: service list, time slot booking, reminders, Firebase auth and an admin view for staff. Experience with Material 3 is required.",
  },
]
