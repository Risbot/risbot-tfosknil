using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Test.Controllers;
using Test.Models;
using Test.Repository;
using Test.Services;
using Xunit;

namespace XUnitTest.Controllers
{
    public class StatisticControllerTest
    {
        private readonly IDatasetRepository _datasetRepository;
        private readonly IStatisticService _statisticService;
        public StatisticControllerTest()
        {
            Mock<IDatasetRepository> mockDatasetRepository = new Mock<IDatasetRepository>();
            mockDatasetRepository
                .Setup(repo => repo.GetUsersCountAsync("datasetId"))
                .Returns(Task.FromResult(5));
            mockDatasetRepository
                .Setup(repo => repo.GetFriendsCountPerUserAsync("datasetId"))
                .Returns(Task.FromResult(new Dictionary<string, int>() {
                    {"1", 2 },
                    {"2", 1 },
                    {"3", 1 },
                }));

            _datasetRepository = mockDatasetRepository.Object;
            _statisticService = new StatisticService(_datasetRepository);
        }

        [Fact]
        public async Task GetStatistic()
        {
            var controller = new StatisticController(_datasetRepository, _statisticService);
            var result = await controller.GetStatistics("datasetId");

            var okResult = Assert.IsType<OkObjectResult>(result);
            var value = Assert.IsType<StatisticModel>(okResult.Value);
            Assert.Equal(200, okResult.StatusCode);
            Assert.Equal(5, value.UsersCount);
            Assert.Equal(1.33, value.AverageFriendsPerUser);
        }
    }
}
