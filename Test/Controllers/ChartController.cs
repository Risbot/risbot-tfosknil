using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Test.Models;
using Test.Repository;

namespace Test.Controllers
{
    [Route("api/[controller]/{datasetId}")]
    [ApiController]
    public class ChartController : ControllerBase
    {
        private readonly IDatasetRepository _datasetRepository;
        public ChartController(IDatasetRepository datasetRepository)
        {
            _datasetRepository = datasetRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get(string datasetId)
        {
            var users = await _datasetRepository.GetUsersAsync(datasetId);
            var friendships = await _datasetRepository.GetFriendshipsAsync(datasetId);

            ChartModel chart = new ChartModel()
            {
                Nodes = users.Select(c => new NodeModel() { Id = c.Id }).ToList(),
                Links = friendships.Select(c => new LinkModel() {
                    Source = c.UserOne,
                    Target = c.UserTwo
                }).ToList()
            };
            return Ok(chart);
        }
    }
}