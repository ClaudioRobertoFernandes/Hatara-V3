@php

    $groupCurrent = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $groupCurrent = explode('/', $groupCurrent);

@endphp
<div class="shrink-0 flex items-center">
    @if($groupCurrent[1] === 'anual')
        @foreach(\App\Http\Controllers\Controller::getListRoute() as $item)
            @if($item['group'] === 'anual')
                <x-responsive-nav-link href="{{ route($item['route']) }}">
                    {{ __($item['label']) }}
                </x-responsive-nav-link>
            @endif
        @endforeach
    @endif
    @if($groupCurrent[1] === 'temporada')

        @foreach(\App\Http\Controllers\Controller::getListRoute() as $item)
            @if($item['group'] === 'temporada')
                <x-responsive-nav-link href="{{ route($item['route']) }}">
                    {{ __($item['label']) }}
                </x-responsive-nav-link>
            @endif
        @endforeach
    @endif
    @if($groupCurrent[1] === 'loteamento')
        @foreach(\App\Http\Controllers\Controller::getListRoute() as $item)
            @if($item['group'] === 'loteamento')
                <x-responsive-nav-link href="{{ route($item['route']) }}">
                    {{ __($item['label']) }}
                </x-responsive-nav-link>
            @endif
        @endforeach
    @endif
</div>
