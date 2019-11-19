using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test.Models
{
    public class NodeModel
    {
        public string Id { get; set; }
        public int Radius
        {
            get { return 3; }
        }

        public string Color
        {
            get { return "rgb(232, 193, 160)"; }
        }
    }
}
