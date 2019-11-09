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
    public class DatasetControllerTest
    {
        private IDatasetRepository datasetRepository;
        public DatasetControllerTest()
        {
            Mock<IDatasetRepository> mockDatasetRepository = new Mock<IDatasetRepository>();
            mockDatasetRepository
                .Setup(repo => repo.AddDatasetAsync("dataset", new List<string>()))
                .Returns(Task.CompletedTask);
            mockDatasetRepository
                .Setup(repo => repo.GetDatasetsAsync())
                .Returns(Task.FromResult(new List<Dataset>() {
                    new Dataset()
                    {
                        Id="id",
                        Name="dataset",
                        Friendships=null
                    }
                }));

            datasetRepository = mockDatasetRepository.Object;
        }

        private IFormFile GetMockFile()
        {
            var mockFile = new Mock<IFormFile>();
            var content = "1 0";
            var fileName = "test.txt";
            var memoryStream = new MemoryStream();
            var streamWriter = new StreamWriter(memoryStream);
            streamWriter.Write(content);
            streamWriter.Flush();
            memoryStream.Position = 0;
            mockFile.Setup(_ => _.OpenReadStream()).Returns(memoryStream);
            mockFile.Setup(_ => _.FileName).Returns(fileName);
            mockFile.Setup(_ => _.Length).Returns(memoryStream.Length);
            return mockFile.Object;
        }

        [Fact]
        public async Task PostDataset()
        {
            var controller = new DatasetController(datasetRepository);

            var datasetModel = new DatasetModel()
            {
                Name = "dataset",
                File = GetMockFile(),
            };
            var result = await controller.Post(datasetModel);

            var okResult = Assert.IsType<OkResult>(result);
            Assert.NotNull(okResult);
            Assert.Equal(200, okResult.StatusCode);
        }

        [Fact]
        public async Task GetDataset()
        {
            var controller = new DatasetController(datasetRepository);

            var result = await controller.Get();

            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult);
            Assert.Single((okResult.Value as List<Dataset>));
            Assert.Equal(200, okResult.StatusCode);
        }
    }
}
