using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Helpers;
using backend.Interfaces;
using backend.Models;

namespace backend.Managers
{
    public class AppUserManager : IAppUserManager
    {
        private readonly IAppUserRepository _appUserRepository;

        public AppUserManager(IAppUserRepository appUserRepository)
        {
            _appUserRepository = appUserRepository;
        }

        public async Task<AppUser> GetUserByEmailAsync(string email)
        {
            var user = await _appUserRepository.GetUserByEmailAsync(email);
            if(user == null)
                throw new Exception("User not found");

            return user;
        }
        public async Task<(List<AppUser>, int)> GetAllUsersAsync(QueryObject queryObject)
        {
            var skippedPage = (queryObject.PageNumber - 1) * queryObject.PageSize;
            var (users, total) = await _appUserRepository.GetAllUsersAsync(skippedPage, queryObject.PageSize);
            if(users == null || total == 0)
                throw new Exception("No users in database");

            return (users, total);
        }
    }
}