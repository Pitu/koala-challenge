<template>
	<div v-if="type === 'clear'"
		class="weather-container clear-day"
		:class="{ night: time === 'night' }"
		:style="{ width: `${width}px` }">
		<div class="sun" />
		<div class="sun-ray r-one" />
		<div class="sun-ray r-two" />
		<div class="sun-ray r-three" />
		<div class="sun-ray r-four" />
		<div class="cloud">
			<div class="circle c-one" />
			<div class="circle c-two" />
			<div class="circle c-three" />
		</div>
	</div>
	<div v-else-if="type === 'snow'"
		class="weather-container snow"
		:class="{ night: time === 'night' }"
		:style="{ width: `${width}px` }">
		<div class="cloud-one">
			<div class="circle c-one" />
			<div class="circle c-two" />
			<div class="circle c-three" />
		</div>
		<div ref="snowflake-container"
			class="snowflake-container">
			<div v-for="(snowflake, index) in snowflakes"
				:key="index"
				:style="{
					left: snowflake.left,
					width: snowflake.size,
					height: snowflake.size,
					animationDelay: snowflake.delay,
					animationDuration: snowflake.animationDuration,
					opacity: snowflake.opacity
				}"
				class="snowflake" />
		</div>
	</div>
	<div v-else-if="type === 'clouds'"
		class="weather-container cloudy"
		:class="{ night: time === 'night' }"
		:style="{ width: `${width}px` }">
		<div class="cloud-one">
			<div class="circle c-one" />
			<div class="circle c-two" />
			<div class="circle c-three" />
		</div>
		<div class="cloud-two">
			<div class="circle c-one" />
			<div class="circle c-two" />
			<div class="circle c-three" />
		</div>
		<div class="cloud-three">
			<div class="circle c-one" />
			<div class="circle c-two" />
			<div class="circle c-three" />
		</div>
		<div class="cloud-four">
			<div class="circle c-one" />
			<div class="circle c-two" />
			<div class="circle c-three" />
		</div>
		<div class="cloud-five">
			<div class="circle c-one" />
			<div class="circle c-two" />
			<div class="circle c-three" />
		</div>
		<div class="cloud-six">
			<div class="circle c-one" />
			<div class="circle c-two" />
			<div class="circle c-three" />
		</div>
		<div class="cloud-seven">
			<div class="circle c-one" />
			<div class="circle c-two" />
			<div class="circle c-three" />
		</div>
		<div class="cloud-eight">
			<div class="circle c-one" />
			<div class="circle c-two" />
			<div class="circle c-three" />
		</div>
		<div class="cloud-nine">
			<div class="circle c-one" />
			<div class="circle c-two" />
			<div class="circle c-three" />
		</div>
		<div class="cloud-ten">
			<div class="circle c-one" />
			<div class="circle c-two" />
			<div class="circle c-three" />
		</div>
		<div class="cloud-eleven">
			<div class="circle c-one" />
			<div class="circle c-two" />
			<div class="circle c-three" />
		</div>
		<div class="cloud-twelve">
			<div class="circle c-one" />
			<div class="circle c-two" />
			<div class="circle c-three" />
		</div>
	</div>
	<div v-else-if="type === 'rain'"
		class="weather-container rain"
		:class="{ night: time === 'night' }"
		:style="{ width: `${width}px` }">
		<div class="cloud-one">
			<div class="circle c-one" />
			<div class="circle c-two" />
			<div class="circle c-three" />
			<div class="circle c-four" />
		</div>
		<div class="cloud-two">
			<div class="circle c-one" />
			<div class="circle c-two" />
			<div class="circle c-three" />
		</div>
		<div class="cloud-three">
			<div class="circle c-one" />
			<div class="circle c-two" />
		</div>
		<div ref="droplet-container"
			class="droplet-container">
			<div v-for="(droplet, index) in droplets"
				:key="index"
				:style="{
					left: droplet.left,
					animationDelay: droplet.delay,
					opacity: droplet.opacity
				}"
				class="droplet" />
		</div>
	</div>
</template>
<script>
export default {
	props: {
		type: {
			type: String,
			default: 'clouds'
		},
		time: {
			type: String,
			default: null
		},
		width: {
			type: Number,
			default: null
		}
	},
	data() {
		return {
			numberOfDroplets: 60,
			numberOfSnowflakes: 30,
			droplets: [],
			snowflakes: []
		};
	},
	mounted() {
		if (this.type === 'rain') return this.setupDroplets();
		if (this.type === 'snow') return this.setupSnowflakes();
	},
	methods: {
		async setupSnowflakes() {
			for (let i = 0; i < this.numberOfSnowflakes; i++) {
				const left = parseInt(Math.random() * 100, 10);
				const size = Math.floor((Math.random() * 11) + 5);
				const delay = Math.random().toFixed(3) * 10;
				const snowFallDuration = Math.floor((Math.random() * 5) + 10);
				const snowDriftDuration = Math.floor((Math.random() * 4) + 4);
				const opacity = Math.random().toFixed(2) * 0.7;

				this.snowflakes.push({
					left: `${left}%`,
					size: `${size}px`,
					delay: `${delay}s`,
					animationDuration: `${snowFallDuration}s, ${snowDriftDuration}s`,
					opacity
				});
			}
		},
		async setupDroplets() {
			for (let i = 0; i < this.numberOfDroplets; i++) {
				const left = parseInt(Math.random() * 100, 10);
				const delay = Math.random().toFixed(3) * 3;
				const opacity = Math.random().toFixed(2) * 0.5;

				this.droplets.push({
					left: `${left}%`,
					delay: `${delay}s`,
					opacity
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
	@keyframes pan {
		0% {
			transform: translateX(0%);
		}

		100% {
			transform: translateX(105%) scaleX(1.3);
			opacity: 0.7;
		}
	}

	.weather-container {
		height: 320px;
		overflow: hidden;
		box-shadow: 0 50px 100px rgba(50, 50, 93, .05),
			0 15px 35px rgba(50, 50, 93, .1),
			0 5px 15px rgba(0, 0, 0, .1);

		position: absolute;
		top: 0;
		left: 0;
		margin: 0;
		z-index: -1;
		transform: scale3d(.5, .5, 1);
		transform-origin: top left;
	}

	.snow {
		background-image: linear-gradient(to bottom, #B4D6FC 0%, #9CAADE 100%);
		&.night {
			background-image: linear-gradient(to bottom, #686a6b 0%, #212734 100%)
		}

		.snowflake-container {
			position: relative;
			left: -10%;
			width: 120%;
			height: 100%;

			.snowflake {
				position: absolute;
				top: -30px;
				height: 20px;
				width: 20px;
				background-color: white;
				border-radius: 50%;
				z-index: 9999;
				animation: snowfalling 10s linear infinite,
					snowdrifting 4s ease-in-out infinite;
			}
		}

		.circle {
			position: absolute;
			background-color: white;
			border-radius: 50%;
		}

		.cloud-one {
			position: relative;
			top: 255px;
			left: -100px;
			animation: panNoFade 80s linear infinite;

			.circle {
				position: absolute;
				background-color: white;
				border-radius: 50%;
			}

			.c-one {
				left: 45px;
				width: 118px;
				height: 118px;
			}

			.c-two {
				top: 40px;
				width: 72px;
				height: 72px;
			}

			.c-three {
				top: 58px;
				left: 150px;
				width: 43px;
				height: 43px;
			}
		}
	}

	@keyframes snowfalling {
		0% {
			top: -20%;
		}

		100% {
			top: 120%;
		}
	}

	@keyframes snowdrifting {
		0% {
			transform: translateX(0);
		}

		50% {
			transform: translateX(40px);
		}

		100% {
			transform: translateX(0);
		}
	}

	.rain {
		background-image: linear-gradient(to bottom, #686a6b 0%, #9a9a9a 100%);
		&.night {
			background-image: linear-gradient(to bottom, #686a6b 0%, #212734 100%)
		}

		.cloud-one {
			position: relative;
			top: -65px;
			animation: panNoFade 80s linear infinite;

			.circle {
				position: absolute;
				background-color: white;
				border-radius: 50%;
			}

			.c-one {
				left: 15px;
				width: 118px;
				height: 118px;
			}

			.c-two {
				top: 50px;
				left: -30px;
				width: 72px;
				height: 72px;
			}

			.c-three {
				top: 50px;
				left: 120px;
				width: 43px;
				height: 43px;
			}

			.c-four {
				top: 50px;
				left: 160px;
				width: 29px;
				height: 29px;
			}
		}

		.cloud-two {
			position: relative;
			top: -70px;
			left: -210px;
			animation: panNoFade 70s linear infinite;

			.circle {
				position: absolute;
				background-color: white;
				border-radius: 50%;
			}

			.c-one {
				left: 28px;
				width: 118px;
				height: 118px;
			}

			.c-two {
				top: 65px;
				width: 43px;
				height: 43px;
			}

			.c-three {
				top: 35px;
				left: 118px;
				width: 72px;
				height: 72px;
			}
		}

		.cloud-three {
			position: relative;
			top: 275px;
			left: 275px;
			animation: panNoFade 100s linear infinite;

			.circle {
				position: absolute;
				background-color: white;
				border-radius: 50%;
			}

			.c-one {
				left: 30px;
				width: 73px;
				height: 73px;
			}

			.c-two {
				top: 25px;
				width: 49px;
				height: 49px;
			}
		}

		.droplet-container {
			position: relative;
			left: 0;
			width: 100%;
			height: 100%;
			animation: panNoFade 70s linear infinite;
		}

		.droplet {
			position: absolute;
			top: -200px;
			width: 1px;
			height: 100px;
			background-color: white;
			border-radius: 5px;
			animation: fall 3s linear infinite;
		}
	}

	@keyframes fall {
		0% {
			transform: translate(0, 0) rotate(-8deg)
		}

		100% {
			transform: translate(417px, 3000px)
		}
	}

	.clear-day {
		background-image: linear-gradient(to bottom, #F84E66 0%, #FADE62 100%);
		&.night {
			background-image: linear-gradient(to left bottom, #525142 0%, #212734 100%);
			.sun {
				background-color: #f5f3ce;
				bottom: unset;
				left: unset;
				top: -80px;
				right: -80px;
			}

			.sun-ray {
				display: none;
			}
		}

		.cloud {
			position: relative;
			animation: pan 60s linear infinite;

			.circle {
				position: absolute;
				background-color: white;
				border-radius: 50%;
			}

			.c-one {
				top: 150px;
				left: 19px;
				width: 30px;
				height: 30px;
			}

			.c-two {
				top: 154px;
				left: 9px;
				width: 22px;
				height: 22px;
			}

			.c-three {
				top: 158px;
				left: 44px;
				width: 13px;
				height: 13px;
			}
		}

		.sun {
			position: absolute;
			border-radius: 50%;
			background-color: white;
			bottom: -80px;
			left: 35%;
			width: 140px;
			height: 140px;
		}

		.sun-ray {
			position: absolute;
			border-radius: 50%;
			background-color: white;
		}

		.r-one {
			bottom: -160px;
			left: 30%;
			width: 270px;
			height: 270px;
			opacity: 0.2;
			animation: ray2 5s infinite;
		}

		.r-two {
			bottom: -180px;
			left: 10%;
			width: 280px;
			height: 280px;
			opacity: 0.2;
			animation: ray3 7s infinite;
		}

		.r-three {
			bottom: -160px;
			left: 19%;
			width: 230px;
			height: 230px;
			opacity: 0.3;
			animation: ray4 4s infinite;
		}

		.r-four {
			bottom: -160px;
			left: 28%;
			width: 240px;
			height: 240px;
			opacity: 0.3;
			animation: ray5 6s infinite;
		}
	}

	@keyframes ray2 {
		0% {
			transform: scale(1);
		}

		50% {
			transform: scale(1.2);
			opacity: 0;
		}

		100% {
			transform: scale(1);
		}
	}

	@keyframes ray3 {
		0% {
			transform: scale(1);
		}

		50% {
			transform: scale(1.2);
			opacity: 0;
		}

		100% {
			transform: scale(1);
		}
	}

	@keyframes ray4 {
		0% {
			transform: scale(1);
		}

		50% {
			transform: scale(1.2);
			opacity: 0;
		}

		100% {
			transform: scale(1);
		}
	}

	@keyframes ray5 {
		0% {
			transform: scale(1);
		}

		50% {
			transform: scale(1.2);
			opacity: 0;
		}

		100% {
			transform: scale(1);
		}
	}

	.partly-cloudy {
		background-image: linear-gradient(to bottom, #3EE0F7 0%, #5089F4 100%);

		.circle {
			position: absolute;
			background-color: white;
			border-radius: 50%;
		}

		.cloudleft {
			position: relative;
			top: 40px;
			animation: pan 80s linear infinite;

			.c-one {
				top: 0;
				left: -35px;
				width: 71px;
				height: 71px;
			}

			.c-two {
				top: 20px;
				left: 23px;
				width: 33px;
				height: 33px;
			}
		}

		.cloudbottom {
			position: relative;
			top: 250px;
			left: 45px;
			animation: pan 120s linear infinite;

			.c-one {
				left: 40px;
				width: 103px;
				height: 103px;
			}

			.c-two {
				top: 35px;
				width: 65px;
				height: 63px;
			}

			.c-three {
				top: 50px;
				left: 130px;
				width: 38px;
				height: 38px;
			}

			.c-four {
				top: 13px;
				left: 165px;
				width: 24px;
				height: 24px;
			}
		}

		.cloudright {
			position: relative;
			top: 210px;
			left: 350px;
			animation: pan 180s linear infinite;

			.c-one {
				width: 49px;
				height: 49px;
			}
		}
	}

	.cloudy {
		background-image: linear-gradient(to bottom, #8cc1f7 0%, #dedede 100%);
		&.night {
			background-image: linear-gradient(to bottom, #686a6b 0%, #212734 100%);
		}

		.cloud-one {
			position: relative;
			top: 50px;
			left: -30px;
			animation: pan 90s linear infinite;

			.circle {
				position: absolute;
				background-color: white;
				border-radius: 50%;
			}

			.c-one {
				left: 15px;
				width: 48px;
				height: 48px;
			}

			.c-two {
				top: 15px;
				width: 22px;
				height: 22px;
			}

			.c-three {
				top: 8px;
				left: 45px;
				width: 32px;
				height: 32px;
			}
		}

		.cloud-two {
			position: relative;
			top: 180px;
			left: 45px;
			animation: pan 60s linear infinite;

			.circle {
				position: absolute;
				background-color: white;
				border-radius: 50%;
			}

			.c-one {
				left: 13px;
				width: 44px;
				height: 44px;
			}

			.c-two {
				top: 15px;
				width: 20px;
				height: 20px;
			}

			.c-three {
				top: 18px;
				left: 61px;
				width: 17px;
				height: 17px;
			}
		}

		.cloud-three {
			position: relative;
			top: 130px;
			left: 290px;
			animation: pan 80s linear infinite;

			.circle {
				position: absolute;
				background-color: white;
				border-radius: 50%;
			}

			.c-one {
				left: 11px;
				width: 30px;
				height: 30px;
			}

			.c-two {
				top: 6px;
				width: 20px;
				height: 20px;
			}

			.c-three {
				top: 9px;
				left: 37px;
				width: 14px;
				height: 14px;
			}
		}

		.cloud-four {
			position: relative;
			top: 245px;
			animation: pan 35s linear infinite;

			.circle {
				position: absolute;
				background-color: white;
				border-radius: 50%;
			}

			.c-one {
				left: 45px;
				width: 118px;
				height: 118px;
			}

			.c-two {
				top: 40px;
				width: 72px;
				height: 72px;
			}

			.c-three {
				top: 58px;
				left: 150px;
				width: 43px;
				height: 43px;
			}
		}

		.cloud-five {
			position: relative;
			top: 275px;
			left: 185px;
			animation: pan 50s linear infinite;

			.circle {
				position: absolute;
				background-color: white;
				border-radius: 50%;
			}

			.c-one {
				width: 71px;
				height: 71px;
			}

			.c-two {
				top: 18px;
				left: 57px;
				width: 33px;
				height: 33px;
			}
		}

		.cloud-six {
			position: relative;
			top: 305px;
			left: 250px;
			animation: pan 30s linear infinite;

			.circle {
				position: absolute;
				background-color: white;
				border-radius: 50%;
			}

			.c-one {
				left: 11px;
				width: 30px;
				height: 30px;
			}

			.c-two {
				top: 6px;
				width: 20px;
				height: 20px;
			}

			.c-three {
				top: 9px;
				left: 37px;
				width: 14px;
				height: 14px;
			}
		}

		.cloud-seven {
			position: relative;
			top: 225px;
			left: 298px;
			animation: pan 40s linear infinite;

			.circle {
				position: absolute;
				background-color: white;
				border-radius: 50%;
			}

			.c-one {
				left: 28px;
				width: 118px;
				height: 118px;
			}

			.c-two {
				top: 65px;
				width: 43px;
				height: 43px;
			}

			.c-three {
				top: 35px;
				left: 118px;
				width: 72px;
				height: 72px;
			}
		}

		.cloud-eight {
			position: relative;
			left: -375px;
			top: 245px;
			animation: pan 35s linear infinite;

			.circle {
				position: absolute;
				background-color: white;
				border-radius: 50%;
			}

			.c-one {
				left: 45px;
				width: 118px;
				height: 118px;
			}

			.c-two {
				top: 40px;
				width: 72px;
				height: 72px;
			}

			.c-three {
				top: 58px;
				left: 150px;
				width: 43px;
				height: 43px;
			}
		}

		.cloud-nine {
			position: relative;
			top: 275px;
			left: -190px;
			animation: pan 45s linear infinite;

			.circle {
				position: absolute;
				background-color: white;
				border-radius: 50%;
			}

			.c-one {
				width: 71px;
				height: 71px;
			}

			.c-two {
				top: 18px;
				left: 57px;
				width: 33px;
				height: 33px;
			}
		}

		.cloud-ten {
			position: relative;
			top: 305px;
			left: -125px;
			animation: pan 35s linear infinite;

			.circle {
				position: absolute;
				background-color: white;
				border-radius: 50%;
			}

			.c-one {
				left: 11px;
				width: 30px;
				height: 30px;
			}

			.c-two {
				top: 6px;
				width: 20px;
				height: 20px;
			}

			.c-three {
				top: 9px;
				left: 37px;
				width: 14px;
				height: 14px;
			}
		}

		.cloud-eleven {
			position: relative;
			top: 225px;
			left: -77px;
			animation: pan 65s linear infinite;

			.circle {
				position: absolute;
				background-color: white;
				border-radius: 50%;
			}

			.c-one {
				left: 28px;
				width: 118px;
				height: 118px;
			}

			.c-two {
				top: 65px;
				width: 43px;
				height: 43px;
			}

			.c-three {
				top: 35px;
				left: 118px;
				width: 72px;
				height: 72px;
			}
		}

		.cloud-twelve {
			position: relative;
			top: 130px;
			left: -85px;
			animation: pan 40s linear infinite;

			.circle {
				position: absolute;
				background-color: white;
				border-radius: 50%;
			}

			.c-one {
				left: 11px;
				width: 30px;
				height: 30px;
			}

			.c-two {
				top: 6px;
				width: 20px;
				height: 20px;
			}

			.c-three {
				top: 9px;
				left: 37px;
				width: 14px;
				height: 14px;
			}
		}
	}

</style>
