import React from 'react';

export default class getApiData extends React.Component{
	constructor (props){
		super(props);
		this.state = {
			name: 'Город',
			description: 'Описание',
			sunrise: '00:00',
			sunset: '00:00',
			temp: '0',
			temp_max: '0',
			temp_min: '0',
			feels_like: '0',
			visibility: '100',
			humidity: '0',
			direction: 'юг',
			clouds: 'Облачность',
			rain: 'Дождь',
			snow: 'Снег',
		};
	}

  	connectApi (){
  		let key = '6015fb54470c52be97c1f7231d204a5c';
		let metric = '&units=metric';
		let api = `https://api.openweathermap.org/data/2.5/weather?q=Anapa&lang=ru&appid=${key}${metric}`;
		
		let response = fetch(api)
		.then(response => response.json())
		.then((data) => {

			this.setState({
				name: data.name,
				description: data.weather[0].description,
				sunrise: data.sys.sunrise,
				sunset: data.sys.sunset,
				temp: data.main.temp,
				temp_max: data.main.temp_max,
				temp_min: data.main.temp_min,
				feels_like: data.main.feels_like,
				visibility: data.visibility,
				humidity: data.main.humidity,
				direction: data.wind.deg,
				clouds: data.clouds.all,
				rain: data.rain,
				snow: data.snow,
			})
			
		})
		.catch((error) => {
		  console.error('Error:', error);
		})
  	}

  	componentDidMount (){
		this.connectApi();
	}

	render () {
		function createTimeView (timeUTC){
			let getMilles = new Date(timeUTC*1000);
			return getMilles.toLocaleTimeString('ru-RU').slice(0, 5);
		}

		// function precipitationTrue(precep, type){
		// 	if (precep === 1) {
		// 		return 'Идет дождь';
		// 	} else {
		// 		console.log(precep)
		// 		return 'Нет';
		// 	}
		// }

		return (
			<div className="weather">
				<div className="leftSection">
					<div className="leftSection_wrap">
						<h1>{this.state.name}</h1>
						<h2>{this.state.description}</h2>
						<ul className="sunrise">
							<li>Рассвет: {createTimeView(this.state.sunrise)}</li>
							<li>Закат: {createTimeView(this.state.sunset)}</li>
						</ul>
					</div>
				</div>
				<div className="rightSection">
					<div>
						<div>
							<h2>{Math.ceil(this.state.temp)}C°</h2>
							<section>
								<h4>{Math.ceil(this.state.temp_max)}C°</h4>
								<h4>{Math.ceil(this.state.temp_min)}C°</h4>
							</section>
						</div>
						<p>Ощущается как: {Math.ceil(this.state.feels_like)}C°</p>
					</div>
					<ul className="other_info">
						<li>Влажность воздуха: {this.state.humidity} %</li>
						<li>Видимость: {this.state.visibility / 1000} км</li>
						<li>Направление ветра: {this.state.direction}</li>
						<li>Облачность: {this.state.clouds} %</li>
						<li>Дождь: {this.state.rain} мм</li>
						<li>Снег: {this.state.snow} мм</li>
					</ul>
				</div>

				<img src="http://openweathermap.org/img/wn/10d@2x.png" alt="" />
			</div>
		)
	}
}