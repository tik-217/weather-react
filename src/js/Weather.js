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
			humidity: '0',
			visibility: '100',
			speed: '0',
			direction: 'Направление',
			clouds: 'Облачность',
			rain: 'Дождь',
			snow: 'Снег',
			errorName: '',
		};

		this.searchCity = this.searchCity.bind(this);
	}

  	connectApi (cityName){
  		let key = '6015fb54470c52be97c1f7231d204a5c';
		let metric = '&units=metric';
		let city = cityName ? cityName : 'Москва';
		let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=${key}${metric}`;

		let response = fetch(api)
		.then(response => response.json())
		.then((data) => {
			this.setState({
				name:        data.name,
				description: data.weather[0].description,
				icon:        data.weather[0].icon,
				sunrise:     data.sys.sunrise,
				sunset:      data.sys.sunset,
				temp:        data.main.temp,
				temp_max:    data.main.temp_max,
				temp_min:    data.main.temp_min,
				feels_like:  data.main.feels_like,
				humidity:    data.main.humidity,
				visibility:  data.visibility,
				speed:       data.wind.speed,
				direction:   data.wind.deg,
				clouds:      data.clouds.all,
				rain:        data.rain,
				snow:        data.snow,
				errorName:   '',
			});
		})
  		.catch(() => {
			this.setState({errorName: "Такого города нет"});
		})
  	}

  	componentDidMount (){
		this.connectApi();
	}

	searchCity(e){
		this.connectApi(e.target.parentNode.children[0].value.trim());
	}

	render () {
		function createTimeView (timeUTC){
			let getMilles = new Date(timeUTC*1000);
			return getMilles.toLocaleTimeString('ru-RU').slice(0, 5);
		}

		function windDirection(deg){
			if (deg >= 0 && deg < 90){
				return 'северо-восток';
			} else if (deg >= 90 && deg < 180){
				return 'юго-восток';
			} else if (deg >= 180 && deg < 360){
				return 'юго-запад';
			} else if (deg >= 360 && deg < 0){
				return 'северо-запад';
			}
		}

		return (
			<div className="weather">
				<div className="cityName">
					<div>
						<input type="text" placeholder="Город" required/>
						<button onClick={this.searchCity}>Найти</button>
						<p className="errorName">{this.state.errorName}</p>
					</div>
				</div>
				<div className="sectionData">
					<div className="leftSection">
						<div>
							<img src={`http://openweathermap.org/img/wn/${this.state.icon}@2x.png`} alt="" />
						</div>
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
							<li>Скорость ветра: {this.state.speed} м/с</li>
							<li>Направление ветра: {windDirection(this.state.direction)}</li>
							<li>Облачность: {this.state.clouds} %</li>
							{this.state.rain ? <li>Дождь: {this.state.rain['1h']} мм</li> : null}
							{this.state.snow ? <li>Снег: {this.state.snow['1h']} мм</li> : null}
						</ul>
					</div>
				</div>
			</div>
		)
	}
}