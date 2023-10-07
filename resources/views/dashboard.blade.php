@section('title', 'Dashboard' )
<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class=" bg-gray-100 overflow-hidden sm:rounded-lg">
{{--                <x-welcome />--}}
                <x-dashboard.dashboard />
            </div>
        </div>
    </div>
</x-app-layout>
