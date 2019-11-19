using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Test.Controllers;
using Test.Data;
using Test.Models;
using Test.Repository;
using Xunit;

namespace XUnitTest.Controllers
{
    public class ChartControllerTest
    {
        private IDatasetRepository datasetRepository;
        public ChartControllerTest()
        {
            Mock<IDatasetRepository> mockDatasetRepository = new Mock<IDatasetRepository>();
            mockDatasetRepository
                .Setup(repo => repo.GetUsersAsync("datasetId"))
                .Returns(Task.FromResult(new List<User>()
                {
                    new User()
                    {
                        Id="1"
                    },
                    new User()
                    {
                        Id="2"
                    }
                }));
            mockDatasetRepository
                .Setup(repo => repo.GetFriendshipsAsync("datasetId"))
                .Returns(Task.FromResult(new List<Friendship>() {
                    new Friendship()
                    {
                        UserOne="1",
                        UserTwo="2"
                    },
                }));

            datasetRepository = mockDatasetRepository.Object;
        }

        [Fact]
        public async Task Get()
        {
            var controller = new ChartController(datasetRepository);

            var result = await controller.Get("datasetId");

            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult);
            Assert.IsType<ChartModel>(okResult.Value);
            Assert.Equal(200, okResult.StatusCode);
        }
    }
}
