using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test.Models
{
    public class ChartModel
    {
        public List<NodeModel> Nodes { get; set; }
        public List<LinkModel> Links { get; set; }
    }
}
