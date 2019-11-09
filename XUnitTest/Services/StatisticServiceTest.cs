using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Test.Repository;
using Test.Services;
using Xunit;

namespace XUnitTest.Services
{
    public class StatisticServiceTest
    {
        private IDatasetRepository datasetRepository;
        public StatisticServiceTest()
        {
            Mock<IDatasetRepository> mockDatasetRepository = new Mock<IDatasetRepository>();
            mockDatasetRepository
                .Setup(repo => repo.GetFriendsCountPerUserAsync("datasetId"))
                .Returns(Task.FromResult(new Dictionary<string, int>() {
                    {"1", 2 },
                    {"2", 1 },
                    {"3", 1 },
                }));

            datasetRepository = mockDatasetRepository.Object;
        }

        [Fact]
        public async void GetAverageFriendsPerUser()
        {
            var service = new StatisticService(datasetRepository);
            var result = await service.GetAverageFriendsPerUser("datasetId");
            Assert.Equal(1.33, Math.Round(result, 2));
        }

    }
}
