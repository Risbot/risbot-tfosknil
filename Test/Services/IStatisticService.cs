using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test.Services
{
    public interface IStatisticService
    {
        Task<double> GetAverageFriendsPerUser(string datasetId);
    }
}
