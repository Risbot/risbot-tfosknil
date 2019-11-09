using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Test.Models;
using EFCore.BulkExtensions;
using Test.Repository;

namespace Test.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DatasetController : ControllerBase
    {
        private readonly IDatasetRepository _datasetRepository;
        public DatasetController(IDatasetRepository datasetRepository)
        {
            _datasetRepository = datasetRepository;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm]DatasetModel model)
        {
            var data = await model.File.ReadAsListAsync();
            await _datasetRepository.AddDatasetAsync(model.Name, data);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var data = await _datasetRepository.GetDatasetsAsync();
            return Ok(data);
        }
    }
}
