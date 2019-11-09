using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test
{
    public static class File
    {
        public static async Task<List<string>> ReadAsListAsync(this IFormFile file)
        {
            List<string> list = new List<string>();
            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                while (reader.Peek() >= 0)
                    list.Add(await reader.ReadLineAsync());
            }
            return list;
        }
    }
}
