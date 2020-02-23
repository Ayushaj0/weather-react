import React, {useContext} from 'react'
import dayjs from 'dayjs'
import FormatTime from '../../utils/FormatTime'
import {WeatherUnitContext} from '../../context/WeatherUnitContext'
import {ThemeContext} from '../../context/ThemeContext'

const DayComponent = props => {
  const {day, icon, iconDesc, index, selectedIndex} = props
  const {weatherUnit} = useContext(WeatherUnitContext)
  const {theme} = useContext(ThemeContext)
  // contrast color based on theme
  const colorTheme = theme === 'light' ? 'dark' : 'light'

  const getIconURL = iconType => {
    return `/weather_icons/${iconType}`
  }

  const computedTempValue = type => {
    return Math.round(day[`temp_${type}_${weatherUnit.toLowerCase()}`])
  }

  const selectedDay = () => {
    props.selectedDay({day, index})
  }

  return (
    <div
      className={`sm:border-t sm:border-r sm:border-${colorTheme} sm:hover:bg-${colorTheme} sm:hover:text-${theme} items-center text-center flex-1 py-1 pb-3 cursor-pointer ${
        index === selectedIndex ? `sm:bg-${colorTheme} sm:text-${theme}` : ''
      } transition-colors duration-1000 ease-in-out`}
      onClick={selectedDay}>
      <p className='font-medium'>
        {dayjs(
          day.date
            .split('/')
            .reverse()
            .join(', ')
        ).format('ddd')}
      </p>
      <img
        src={getIconURL(icon)}
        alt='weather icon'
        title={iconDesc}
        className='mx-auto'
      />
      <div className='flex flex-row justify-center font-light'>
        <p className='mx-2'>
          {computedTempValue('max')}
          <sup>o</sup>
        </p>
        <p className='mx-2'>
          {computedTempValue('min')}
          <sup>o</sup>
        </p>
      </div>
      <div className='flex flex-row justify-center sm:flex-col font-light'>
        <div className='flex flex-row justify-center items-center mx-2'>
          <img
            src={getIconURL('Sunny.gif')}
            alt='weather icon'
            title='sunrise'
            className='w-6'
          />
          <p className='text-sm'>{FormatTime(`${day.sunrise_time}`)}</p>
        </div>
        <div className='flex flex-row justify-center items-center mx-2'>
          <img
            src={getIconURL('PartlyCloudyDay.gif')}
            alt='weather icon'
            title='sunset'
            className='w-6'
          />
          <p className='text-sm'>{FormatTime(`${day.sunset_time}`)}</p>
        </div>
      </div>
    </div>
  )
}

export default DayComponent
