<div>
    @if(!Route::is('dashboard'))
        <x-dropdown-link href="{{ route('dashboard') }}">
            {{ __('Módulo anual') }}
        </x-dropdown-link>
    @endif
    @if(!Route::is('dashboard-temp'))
        <x-dropdown-link href="{{ route('dashboard-temp') }}">
            {{ __('Módulo temporada') }}
        </x-dropdown-link>
    @endif
    @if(!Route::is('dashboard-lot'))
        <x-dropdown-link href="{{ route('dashboard-lot') }}">
            {{ __('Módulo loteamento') }}
        </x-dropdown-link>
    @endif
</div>
