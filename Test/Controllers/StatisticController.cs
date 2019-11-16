using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Test.Models;
using Test.Repository;
using Test.Services;

namespace Test.Controllers
{
    [Route("api/[controller]/{datasetId}")]
    [ApiController]
    public class StatisticController : ControllerBase
    {
        private readonly IDatasetRepository _datasetRepository;
        private readonly IStatisticService _statisticService;
        public StatisticController(
            IDatasetRepository datasetRepository,
            IStatisticService statisticService
        )
        {
            _datasetRepository = datasetRepository;
            _statisticService = statisticService;
        }

        [HttpGet()]
        public async Task<IActionResult> Get(string datasetId)
        {
            var statistic = new StatisticModel();
            statistic.UsersCount = await _datasetRepository.GetUsersCountAsync(datasetId);
            statistic.AverageFriendsPerUser = Math.Round(await _statisticService.GetAverageFriendsPerUser(datasetId), 2);
            return Ok(statistic);
        }

    }
}