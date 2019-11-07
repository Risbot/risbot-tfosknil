using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test.Data
{
    public class Friendship
    {
        public string UserOne { get; set; }
        public string UserTwo { get; set; }
        public string DatasetId { get; set; }
        public Dataset Dataset { get; set; }
    }
}
