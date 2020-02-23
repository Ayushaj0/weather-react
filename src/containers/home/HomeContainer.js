import React, {Component, Suspense, lazy} from 'react'
import './HomeStyle.scss'
import AutoCompleteContainer from '../autocomplete/AutoCompleteContainer'
import LoaderComponent from '../../components/loader/LoaderComponent'
import {AddressContextProvider} from '../../context/AddressContext'
import {WeatherUnitContextProvider} from '../../context/WeatherUnitContext'
import {ThemeContext} from '../../context/ThemeContext'
import HeaderComponent from '../../components/header/HeaderComponent'
const WeatherContainer = lazy(() => import('./../weather/WeatherContainer'))
const FavoritesContainer = lazy(() => import('../favorites/FavoritesContainer'))

export class HomeContainer extends Component {
  static contextType = ThemeContext
  render() {
    return (
      <div
        className={`bg-${this.context.theme} absolute top-0 right-0 bottom-0 left-0`}>
        <HeaderComponent />
        <AddressContextProvider>
          <AutoCompleteContainer />
          <WeatherUnitContextProvider>
            <Suspense fallback={<LoaderComponent />}>
              <WeatherContainer />
              <FavoritesContainer />
            </Suspense>
          </WeatherUnitContextProvider>
        </AddressContextProvider>
      </div>
    )
  }
}

export default HomeContainer
