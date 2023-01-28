<div class="loading">
	<i class="ri-loader-4-line rotate" />
	页面加载中，请稍后...
</div>

<style lang="less">
	@keyframes rotate {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
	.rotate {
		animation: rotate 1s linear infinite;
	}
	.loading {
		i {
			font-size: 20px;
			font-weight: bold;
		}
	}
</style>
