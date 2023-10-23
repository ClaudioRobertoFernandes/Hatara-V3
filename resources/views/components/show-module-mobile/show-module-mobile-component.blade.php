<div>
    @if(!request()->routeIs('dashboard'))
        <x-responsive-nav-link href="{{ route('dashboard') }}">
            {{ __('Módulo anual') }}
        </x-responsive-nav-link>
    @endif
    @if(!request()->routeIs('dashboard-temp'))
        <x-responsive-nav-link href="{{ route('dashboard-temp') }}">
            {{ __('Módulo temporada') }}
        </x-responsive-nav-link>
    @endif
    @if(!request()->routeIs('dashboard-lot'))
        <x-responsive-nav-link href="{{ route('dashboard-lot') }}">
            {{ __('Módulo loteamento') }}
        </x-responsive-nav-link>
    @endif
</div>
