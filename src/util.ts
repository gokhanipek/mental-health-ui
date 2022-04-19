export const arrayByCountry = (country, data) => data.filter(item => item.Country === country);

export const getAverageAge = (items) => {
  let total = 0;
  let count = 0;

  items.forEach(function (item, index) {
    total += item.Age;
    count++;
  });

  return total / count;
}

export const getFamilyHistory = (items) => items.filter(item => {
  const familyHistory = item.family_history;
  return familyHistory.toLowerCase() === 'yes'
});

export const getTreatmentSought = (items) => items.filter(item => {
  const treatmentSought = item.treatment;
  return treatmentSought.toLowerCase() === 'yes'
});