// Temporary workaround for clock skew issues
export const clerkConfig = {
  // Add clock skew tolerance
  clockSkewTolerance: 300, // 5 minutes in seconds
  // Force token refresh
  forceRefresh: true,
}
