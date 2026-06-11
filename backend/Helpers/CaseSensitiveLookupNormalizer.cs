using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace backend.Helpers
{
    public class CaseSensitiveLookupNormalizer : ILookupNormalizer
    {
        public string? NormalizeName(string? name) => name;

        public string? NormalizeEmail(string? email) => email?.ToUpperInvariant();
    }
}