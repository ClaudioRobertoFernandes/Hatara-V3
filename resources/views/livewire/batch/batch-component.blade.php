<div>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Lotes cadastrados') }}
        </h2>
    </x-slot>
    <div class="py-6">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="overflow-hidden sm:rounded-lg">
                <div class="bg-white py-10">
                    <div class="mx-auto max-w-7xl">
                        <div class="px-4 sm:px-6 lg:px-8">
                            <div class="sm:flex sm:items-center">
                                <div class="sm:flex-auto">
                                    <h1 class="text-base font-semibold leading-6 text-gray-900">
                                        {{ __('Lotes') }}
                                        <span
                                            class="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">
                                            {{ __($countBatches) }}
                                        </span>
                                    </h1>
                                    <p class="mt-2 text-sm text-gray-700">{{ __('Lista de lotes cadastrados.') }} </p>
                                </div>
                                <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                    <div x-data="{ show: false }">
                                        <button
                                            @click="show = true"
                                            class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            {{ __('Novo lote') }}</button>
                                        <x-batches.new-batch-modal :show="false"/>
                                    </div>
                                </div>
                                <div class="divide-y divide-red-700"></div>
                            </div>

                            <div class="mt-8 flow-root">
                                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                        <table class="min-w-full divide-y divide-gray-300">
                                            <thead>
                                            <tr>
                                                <th scope="col"
                                                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                    Lote/Quadra
                                                </th>
                                                <th scope="col"
                                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Vendido
                                                </th>
                                                <th scope="col"
                                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Quitado
                                                </th>
                                                <th scope="col"
                                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Escriturado
                                                </th>
                                                <th scope="col"
                                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Contrato scaneado
                                                </th>
                                                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                                    <span class="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody class="divide-y divide-gray-200">

                                            @foreach($batches as $batch)
                                                <tr>
                                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{{ 'L-'.$batch->batch.' Q-'.$batch->block }}</td>
                                                    <td class="whitespace-nowrap px-3 py-4 text-sm">
                                                        <span
                                                            class="{{ ($batch->sold === 'SIM') ? \App\Enums\Batch\Batch::SIM->getStyles() : \App\Enums\Batch\Batch::NAO->getStyles() }}">{{ $batch->sold }}</span>
                                                    </td>
                                                    <td class="whitespace-nowrap px-3 py-4 text-sm">
                                                        <span
                                                            class="{{ ($batch->settled === 'SIM') ? \App\Enums\Batch\Batch::SIM->getStyles() : \App\Enums\Batch\Batch::NAO->getStyles() }}">{{ $batch->settled }}</span>
                                                    </td>
                                                    <td class="whitespace-nowrap px-3 py-4 text-sm">
                                                        <span
                                                            class="{{ ($batch->written_down === 'SIM') ? \App\Enums\Batch\Batch::SIM->getStyles() : \App\Enums\Batch\Batch::NAO->getStyles() }}">{{ $batch->written_down }}</span>
                                                    </td>
                                                    <td class="whitespace-nowrap px-3 py-4 text-sm">
                                                        <span
                                                            class="{{ ($batch->scan_contract === 'SIM') ? \App\Enums\Batch\Batch::SIM->getStyles() : \App\Enums\Batch\Batch::NAO->getStyles() }}">{{ $batch->scan_contract }}</span>
                                                    </td>

                                                    <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                        <a href="#"
                                                           class="text-indigo-600 hover:text-indigo-900">Edit<span
                                                                class="sr-only">, Lindsay Walton</span></a>
                                                    </td>
                                                </tr>
                                            @endforeach
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
