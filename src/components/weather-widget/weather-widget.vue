<template>
	<div ref="container"
		class="container"
		:class="{ error }">
		<template v-if="!error && forecast">
			<div class="change-day"
				@click="switchDay(false)">
				<img src="~/assets/icons/arrow.svg"
					alt="Previous day">
			</div>
			<div class="change-day inverted"
				@click="switchDay(true)">
				<img src="~/assets/icons/arrow.svg"
					alt="Next day">
			</div>

			<div ref="wrapper"
				class="days-container">
				<div v-for="(item, index) in forecast.list"
					:key="index"
					ref="day"
					class="day">
					<div class="summary">
						<!-- I want to prevent the widget not rendering before the animation starts so I keep 3 of them rendered but hidden -->
						<Background v-if="currentDay === index - 1 || currentDay === index || currentDay === index + 1"
							:type="item.weather"
							:width="width * 2"
							:time="forecast.isDayTime ? 'day' : 'night'" />

						<div class="weather">
							<span class="temperature">{{ item.currentTemp }}</span>
							<span class="units">°{{ units === 'metric' ? 'C' : 'F' }}</span>
						</div>
						<div class="info">
							<img class="icon"
								src="~/assets/icons/location.svg"
								alt="Location icon">
							<p>{{ forecast.name }}</p>
						</div>
					</div>
					<div class="details">
						<h1 class="title dark">{{ item.day }}</h1>
						<h2 class="subtitle">{{ item.weatherDescription }}</h2>

						<div class="data">
							<div>
								<img src="~/assets/icons/temperature.svg"
									class="icon x2"
									alt="Temperature icon">
								<span class="label">Temperature</span>
								<span class="value">{{ item.minTemp }}° | {{ item.maxTemp }}°</span>
							</div>

							<div>
								<img src="~/assets/icons/cloud.svg"
									class="icon x2"
									alt="Clouds icon">
								<span class="label dark">Cloud coverage</span>
								<span class="value">{{ item.cloudPercentage }}%</span>
							</div>

							<div>
								<img src="~/assets/icons/humidity.svg"
									class="icon x2"
									alt="Humidity icon">
								<span class="label dark">Humidity</span>
								<span class="value">{{ item.humidity }}%</span>
							</div>

							<div>
								<img src="~/assets/icons/wind.svg"
									class="icon x2"
									alt="Wind speed icon">
								<span class="label dark">Wind speed</span>
								<span class="value">{{ item.windSpeed }} km/h</span>
							</div>

							<div>
								<img src="~/assets/icons/umbrella.svg"
									class="icon x2"
									alt="Rain volume icon">
								<span class="label dark">Rain volume</span>
								<span class="value">{{ item.rain }}mm</span>
							</div>

							<div>
								<img src="~/assets/icons/snow.svg"
									class="icon x2"
									alt="Snow volume icon">
								<span class="label dark">Snow volume</span>
								<span class="value">{{ item.snow }}mm</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>
		<template v-else>
			{{ error }}
		</template>
	</div>
</template>

<script>
import Background from './background';
export default {
	components: { Background },
	props: {
		apiKey: {
			type: String,
			default: null
		},
		units: {
			type: String,
			default: 'metric'
		},
		locale: {
			type: String,
			default: navigator.language
		}
	},
	data() {
		return {
			baseUrl: null,
			error: null,
			forecast: null,
			currentDay: 0,
			width: 0
		};
	},
	mounted() {
		if (!this.apiKey) {
			this.error = 'You need to provide an API key to use this widget';
			return;
		}
		this.baseUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${this.apiKey}`;
		this.getForecast();
		this.registerWindowResize();
	},
	methods: {
		getCurrentPosition() {
			// Callbacks are evil, let's make it a promise
			return new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject, {
					enableHighAccuracy: true,
					timeout: 5000,
					maximumAge: 0
				});
			});
		},
		async getForecast() {
			if (!navigator.geolocation) return this.err = 'Your browser doesn\'t support the Geolocation API';
			try {
				const { coords } = await this.getCurrentPosition();
				const response = await fetch(`${this.baseUrl}&lat=${coords.latitude}&lon=${coords.longitude}&units=${this.units}`);
				const data = await response.json();
				this.processForecast(data);
				this.applyStyles();
			} catch (err) {
				if (err.code) {
					this.error = err.message;
				} else {
					this.error = err;
				}
			}
		},
		processForecast(data) {
			const { name, country } = data.city;
			const forecast = data.list;

			/*
				Since we are providing the next 5 days forecast this should return every item in the
				API array that matches the current time for the next week.

				First we filter by matching timestamps and then we return only the data we need for the UI
			*/
			const timestamps = this.getFutureForecastTimestamps(forecast[0].dt);
			const filteredList = forecast.filter(el => timestamps.includes(el.dt));
			filteredList[0].meta = 'Right now';

			/*
				Some values like rain, snow, etc we need to set a default since the property might not exist
				as per described on the API docs.
			*/
			const cleanList = filteredList.map(el => {
				return {
					weatherDescription: el.weather[0].description,
					weather: this.getWeatherBackground(el.weather[0].main),
					currentTemp: Math.floor(el.main.temp),
					minTemp: Math.floor(el.main.temp_min),
					maxTemp: Math.floor(el.main.temp_max),
					windSpeed: parseFloat(el.wind.speed * 3.6).toFixed(1),
					rain: el.rain ? el.rain['3h'] : 0,
					snow: el.snow ? el.snow['3h'] : 0,
					humidity: el.main.humidity,
					cloudPercentage: el.clouds ? el.clouds.all : 0,
					day: el.meta ? el.meta : this.getDayFromTimestamp(el.dt)
				};
			});

			this.forecast = {
				name,
				country,
				isDayTime: this.isDayTime(),
				list: cleanList
			};
		},
		async applyStyles() {
			await this.$nextTick();

			// Reset values
			this.currentDay = 0;
			this.width = 0;
			this.$refs.wrapper.style.transform = 'translate3d(0, 0, 0)';

			// Grab the container width to be able to calculate movement
			this.width = this.$refs.container.clientWidth;

			// Children should have the same width as the container
			this.$refs.day.forEach(day => day.style.width = `${this.width}px`);
		},
		switchDay(next) {
			if (next && this.currentDay !== 4) this.currentDay++;
			else if (!next && this.currentDay !== 0) this.currentDay--;

			this.$refs.wrapper.style.transform = `translate3d(-${this.width * this.currentDay}px, 0, 0)`;
		},
		getWeatherBackground(weather) {
			switch (weather.toLowerCase()) {
				case 'drizzle':
				case 'rain':
				case 'thunderstorm':
					return 'rain';
				case 'snow':
				case 'clear':
				case 'clouds':
					return weather.toLowerCase();
				default:
					// There are certain weathers like mist, haze, smoke, etc that I don't have backgrounds for so...
					return 'clear';
			}
		},
		getFutureForecastTimestamps(original) {
			const result = [];
			for (let i = 0; i < 5; i++) {
				result.push(original + (86400 * i));
			}
			return result;
		},
		getDayFromTimestamp(timestamp) {
			const d = new Date(timestamp * 1000);
			const converted = new Intl.DateTimeFormat(this.locale, { weekday: 'long' }).format(d);
			return converted;
		},
		isDayTime() {
			const hours = new Date().getHours();
			// Depending on where the user lives this will be different, so I'm using a rough aproximation
			return hours > 6 && hours < 20;
		},
		registerWindowResize() {
			window.addEventListener('resize', () => {
				this.applyStyles();
			});
		}
	}
};
</script>
<style lang="scss" scoped>
	div.container {
		margin: 1rem 0;
		position:relative;
		box-shadow: 0 10px 30px rgba(0,0,0,.1), 0 1px 8px rgba(0,0,0,.2);
		overflow: hidden;

		&.error {
			padding: 2rem;
			text-align: center;
			background: #fff3d9;
			border: 1px dashed #ffae00;
			border-style: dashed;
		}

		div.days-container {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
			height: 100%;
			transition: all 300ms cubic-bezier(0.68, -0.01, 0.13, 1.01);

			div.day {
				background: #f7f7f7;
				position: relative;
				> div { padding: 2rem; }

				.icon {
					width: 1rem;
					height: 1rem;

					&.x2 {
						width: 2rem;
						height: 2rem;
					}
				}

				div.summary {
					color: white;
					display: grid;
					grid-template-columns: 1fr;
					grid-template-rows: 1fr 1fr;
					grid-template-areas: "weather" "info";
					text-shadow: -1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5);
					position: absolute;
					top: 0;
					left: 0;
					width: calc(100% - 4rem);
					height: calc(160px - 4rem);
					z-index: 2;
					overflow: hidden;

					&.night {
						background: #2e1d57;
					}
					div.weather {
						display: grid;
						grid-area: weather;
						grid-template-columns: auto auto 1fr;
						grid-template-rows: 1fr;
						justify-items: end;
						font-weight: bold;

						img.icon {
							width: 48px;
							height: 48px;
						}
						span.temperature {
							font-size: 3rem;
						}
					}

					div.info {
						display: grid;
						grid-area: info;
						grid-template-columns: auto auto 1fr;
						grid-template-rows: 1fr;
						align-items: center;
						margin-top: 1rem;

						img.icon {
							/*
							Since I only plan on using black and white there's no point in importing the svg as inline
							to then be able to change it's `fill` property. So I opted for invert() instead.
							*/
							filter: invert(1);
							margin-right: .5rem;
						}
					}

				}

				div.details {
					margin-top: 160px;
					color: #363636;

					.dark { color: #131313; }

					h1.title {
						font-size: 2rem;
						font-weight: 600;
						line-height: 1.125;
					}

					h2.subtitle {
						font-size: 1.5rem;
						margin-bottom: 2rem;
					}

					div.data {
						display: grid;
						grid-template-columns: repeat(auto-fill, 200px);
						align-items: center;

						> div {
							display: grid;
							grid-template-columns: auto 1fr;
							grid-template-rows: auto 1fr;
							grid-template-areas: "icon label" "icon value";
							margin: 1rem 0rem;

							img.icon {
								grid-area: icon;
								margin-right: 0.5rem;
							}
							span.label {
								grid-area: label;
								font-weight: bold;
								margin-bottom: .25rem;
							}
							span.value { grid-area: value; }
						}
					}
				}
			}
		}

		div.change-day {
			width: 3rem;
			height: 3rem;
			transform: rotate3d(0, 0, 1, -90deg);
			position: absolute;
			margin-top: 8.5rem;
			left: -10px;
			opacity: 0;
			transition: all 250ms;
			cursor: pointer;
			background: rgba(0, 0, 0, 0.25);
			border-radius: 50%;
			z-index: 3;

			&.inverted {
				transform: rotate3d(0, 0, 1, 90deg);
				left: unset;
				right: -10px;
				opacity: 0;
			}

			&:hover {
				background: rgba(0, 0, 0, 0.5);
			}

			> img {
				filter: invert(1);
				width: 3rem;
				height: 3rem;
				transform: translate3d(0, 8px, 0);
			}
		}

		&:hover div.change-day {
			opacity: 1;
			left: 10px;

			&.inverted {
				left: unset;
				right: 10px;
			}
		}
	}
</style>
