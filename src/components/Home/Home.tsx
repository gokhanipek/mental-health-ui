import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from '../Chart/Chart';
import { arrayByCountry, getAverageAge, getFamilyHistory, getTreatmentSought } from '../../util';


const Home = () => {
  const [country, setCountry] = useState<string>('US');
  const [data, setData] = useState<any>({});
  const [dataByCountry, setDataByCountry] = useState<any>([]);
  const [averageAge, setAverageAge] = useState<any>([]);
  const [familyHistoryNumber, setFamilyHistoryNumber] = useState<any>(0);
  const [treatmentSought, setTreatmentSought] = useState<any>(0);
  const [entrySize, setEntrySize] = useState<any>(100);
  const [visibleData, setVisibleData] = useState<any>([]);

  const setDataValues = (countryString, allData) => {
    const countrySpecificArray = arrayByCountry(countryString, allData);
    const age = getAverageAge(countrySpecificArray);
    const familyHistory = getFamilyHistory(countrySpecificArray);
    const treatment = getTreatmentSought(countrySpecificArray);
    setDataByCountry(countrySpecificArray);
    setAverageAge(Math.floor(age));
    setFamilyHistoryNumber(familyHistory.length);
    setTreatmentSought(treatment.length);
  }

  useEffect(() => {
    axios.get('https://mental-health-survery-api.herokuapp.com/data')
      .then(function (response) {
        setData(response.data)
        setDataValues('United States', response.data);
        setVisibleData(response.data.slice(0, 100));
        setCountry('United States')
      })
      .catch(function (err) {
        console.error(err);
      })

  }, [])

  useEffect(() => {
      setVisibleData(dataByCountry.slice(0, entrySize));
  }, [entrySize, country])

  const onClickHandler = (event) => {
    event.preventDefault();
    setCountry(event.target.id);
    setDataValues(event.target.id, data);
  }

  const entriesHandler = (event) => {
    event.preventDefault();
    setEntrySize(event.target.id);
  }

  return (
    <>
      <div className="content-wrapper">
        <div className="content-section">
          <div className="content-section-title">{country}</div>
          <div className="apps-card">
            <div className="app-card">
              <span>
                <Chart
                  datasetLabel={'Data'}
                  dataset={[dataByCountry.length, averageAge, familyHistoryNumber, treatmentSought]}
                  labels={['Number of entries', 'Age', 'Family History', 'Treatment Sought']}
                  country={country} />
              </span>
              <div className="app-card__subtext">Demographic for United States</div>
              <div className="app-card-buttons">
                <button className="content-button status-button" id={'United States'} onClick={onClickHandler}>United States</button>
                <button className="content-button status-button" id={'Canada'} onClick={onClickHandler}>Canada</button>
                <button className="content-button status-button" id={'United Kingdom'} onClick={onClickHandler}>United Kingdom</button>
              </div>
            </div>
          </div>
        </div>
        <div className="content-section">
          <div className="content-section-title">List of people</div>
          <div className="app-card-buttons" style={{margin: '0 0 20px 0'}}>
            <button className="content-button status-button" id={100} onClick={entriesHandler}>100 Entries</button>
            <button className="content-button status-button" id={500} onClick={entriesHandler}>500 Entries</button>
            <button className="content-button status-button" id={-1} onClick={entriesHandler}>All Entries</button>
          </div>
          <ul>
            <li className="adobe-product">
              <div className="products">
                #
              </div>
              <div className="products">
                Age
              </div>
              <div className="products">
                State
              </div>
              <div className="products">
                Treatment
              </div>
              <div className="products">
                Family History
              </div>
              <div className="products">
                Seek Help
              </div>
            </li>
            {
              visibleData.map((country, index) => {
                return <li className="adobe-product">
                  <div className="products">
                    {index + 1}
                  </div>
                  <div className="products">
                    {country.Age}
                  </div>
                  <div className="products">
                    {country.state}
                  </div>
                  <div className="products">
                    {country.treatment}
                  </div>
                  <div className="products">
                    {country.family_history}
                  </div>
                  <div className="products">
                    {country.seek_help}
                  </div>
                </li>
              })
            }
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;
