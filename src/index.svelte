<script>
	import { onMount, createEventDispatcher } from 'svelte';

	export let alwaysShowEngAddr = false;
	export let animation = false;
	export let autoClose = false;
	export let autoMapping = true;
	export let autoResize = false;
	export let defaultQuery = null;
	export let errorMessage = '<p>현재 Daum 우편번호 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해주세요.</p>';
	export let height = '400px';
	export let hideEngBtn = false;
	export let hideMapBtn = false;
	export let maxSuggestItems = 10;
	export let pleaseReadGuide = 0;
	export let pleaseReadGuideTimer = 1.5;
	export let scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
	export let shorthand = true;
	export let showMoreHName = false;
	export let style = '';
	export let submitMode = true;
	export let theme = null;
	export let useSuggest = true;
	export let useBannerLink = true;
	export let width = '100%';
	export let focusInput = true;
	export let focusContent = true;

  let display = 'block';
  let error = false;

  $: daumWidth = width;
  $: daumHeight = height;

	let daumRef = null;

	const dispatch = createEventDispatcher();


	onMount(() => {
		const scriptId = 'daum_postcode';
		const isExist = !!document.getElementById(scriptId);
		if (!isExist) {
			const script = document.createElement('script');
      script.src = scriptUrl;
      script.onload = () => onLoad();
      script.onerror = error => onError(error);
      script.id = scriptId;
      document.body.appendChild(script);
		} else {
			onLoad();
		}
	});

	const onLoad = () => {
		window.daum.postcode.load(() => {
			const postCode = new window.daum.Postcode({
				oncomplete: onComplete,
				onsearch: onSearch,
				onresize: onResize,
				alwaysShowEngAddr,
				animation,
				autoMapping,
				autoResize,
				height: '100%',
				hideEngBtn,
				hideMapBtn,
				maxSuggestItems,
				pleaseReadGuide,
				pleaseReadGuideTimer,
				shorthand,
				showMoreHName,
				submitMode,
				theme,
				useSuggest,
				useBannerLink,
				width: '100%',
				focusInput,
				focusContent
			});
			postCode.embed(daumRef, { q: defaultQuery, autoClose: autoClose });
		});
	}

	const onError = (error) => {
    error.target.remove();
    error = true;
    dispatch('error');
	}

	const onComplete = (data) => {
    dispatch('complete', { data });
	}

	const onSearch = (data) => {
		dispatch('search', { data });
	}

	const onResize = (size) => {
		if (autoResize) {
			height = size.height;
		}
	}

</script>

<div 
  bind:this={daumRef}
  style={`
    display: ${display};
    width: ${daumWidth};
    height: ${daumHeight};
    ${style}
  `}  
>
  {#if error}
    {errorMessage}
  {/if}
</div>