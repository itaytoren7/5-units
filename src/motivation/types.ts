export interface MotivationState {
  version: 1;
  /** YYYY-MM-DD days with any study activity recorded by this layer (ratings, practice, simulations). */
  activityDays: string[];
  /** badge id → ISO datetime of the unlock */
  unlockedBadges: Record<string, string>;
  /** Badges earned before this layer existed are recorded once, silently, so they don't all pop on first load. */
  seeded: boolean;
  /** "הפחתת אנימציות" — turns off transitions, page animations and confetti. */
  reducedMotion: boolean;
}
