using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Helpers;
using backend.Models;

namespace backend.Interfaces
{
    public interface IAppUserManager
    {
        Task<AppUser> GetUserByEmailAsync(string email);
        Task<(List<AppUser>, int)> GetAllUsersAsync(QueryObject queryObject);
    }
}