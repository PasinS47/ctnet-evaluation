using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Helpers;
using backend.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Interfaces
{
    public interface IAppUserRepository
    {
        Task<AppUser?> GetUserByEmailAsync(string email);
        Task<AppUser?> GetUserByUsernameAsync(string username);
        Task<IdentityResult> CreateUserAsync(AppUser user, string password);
        Task<IdentityResult> AddUserRoleAsync(AppUser user, string role);
        Task<(List<AppUser>?, int)> GetAllUsersAsync(int skippedPage, int pageSize);

        Task<SignInResult> CheckSignInPassword(AppUser user, string password);

    }
}