import { Router } from 'express'
import request from 'request-promise-native'
import { apiStatus } from '../../../lib/util'
import config from 'config'

module.exports = () => {
  const api = Router();
  const weatherApi = config.extensions['weather-api']
  api.get('/current', async (req, res) => {
    try {
      const result = await request({
        uri: 'http://api.weatherapi.com/v1/current.json',
        json: true,
        qs: {
          key: weatherApi.key,
          q: req.query.q
      }
    })
    return apiStatus(res, result, 200);
    } catch (e) {
      apiStatus(res, "Something went wrong", 500)
    }
  })

  api.get('/forecast', async (req, res) => {
    try {
      const result = await request({
        uri: 'http://api.weatherapi.com/v1/forecast.json',
        json: true,
        qs: {
          key: weatherApi.key,
          q: req.query.q,
          days: req.query.days,
          dt: req.query.dt
        }
      })
      return apiStatus(res, result, 200);
    } catch (e) {
      apiStatus(res, "Something went wrong", 500)
    }
  })

  return api
}
