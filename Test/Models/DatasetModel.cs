using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test.Models
{
    public class DatasetModel
    { 
        public IFormFile File { get; set; }
        public string Name { get; set; }
    }
}
