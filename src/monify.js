function monify(num) {
  num =
    Math.round(num) === num ? num : (Math.round(num * 100) / 100).toFixed(2);

  return '$' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default monify;
