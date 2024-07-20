using System.Security.Claims;

namespace backend.Helpers
{
    public static class UserHelper
    {
        public static int GetValidUserId(ClaimsPrincipal user)
        {
            string? userId = user.FindFirstValue("UserId") ?? throw new UnauthorizedAccessException("Missing 'UserId' claim.");

            try
            {
                return int.Parse(userId);
            }
            catch (FormatException)
            {
                throw new UnauthorizedAccessException("Invalid 'UserId' format. Expected integer.");
            }
        }
    }

}