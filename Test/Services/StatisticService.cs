using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test.Repository;

namespace Test.Services
{
    public class StatisticService : IStatisticService
    {
        private readonly IDatasetRepository _datasetRepository;
        public StatisticService(IDatasetRepository datasetRepository)
        {
            _datasetRepository = datasetRepository;
        }

        public async Task<double> GetAverageFriendsPerUser(string datasetId)
        {
            var data = await _datasetRepository.GetFriendsCountPerUserAsync(datasetId);
           
            return data.Values.Sum() / (double)data.Count;
        }
    }
}
