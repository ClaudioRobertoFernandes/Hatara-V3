<div>
    <div class="fixed z-10 inset-0 overflow-y-auto" x-show="show">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div
                class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <form class="mt-5" wire:submit="save">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:items-center">
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <div class="flex items-center justify-between space-x-4">
                                    <h1 class="text-xl font-medium text-gray-800 ">{{ __('Criar novo lote') }}</h1>

                                    <button
                                        @click="show = false"
                                        type="button"
                                        class="text-gray-600 hover:text-gray-700 focus:outline-none"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <p class="mt-2 text-sm text-gray-500 ">
                                    Cadastrar informações do lote.
                                </p>
                                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                    <div class="sm:col-span-3">
                                        <label
                                            for="batch"
                                            class="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            {{ __('Lote') }}
                                            <span
                                                class="inline-flex items-center text-xs font-medium text-red-700">*</span>
                                        </label>
                                        <div class="mt-2">
                                            <input
                                                type="text"
                                                name="batch"
                                                id="batch"
                                                wire:model="batch"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 @error('batch') text-red-700 @enderror shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                            <div class="border-primary-500">
                                                @error('batch') <span
                                                    class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{{ $message }}</span>@enderror
                                            </div>
                                        </div>
                                    </div>

                                    <div class="sm:col-span-3">
                                        <label
                                            for="block"
                                            class="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            {{ __('Quadra') }}
                                            <span
                                                class="inline-flex items-center text-xs font-medium text-red-700">*</span>
                                        </label>
                                        <div class="mt-2">
                                            <input
                                                type="text"
                                                name="block"
                                                id="block"
                                                wire:model="block"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 @error('block') text-red-700 @enderror  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                            <div class="border-primary-500">
                                                @error('block') <span
                                                    class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{{ $message }}</span>@enderror
                                            </div>
                                        </div>
                                    </div>
                                    <div class="sm:col-span-3">
                                        <label
                                            for="sold"
                                            class="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            {{ __('Vendido') }}
                                        </label>
                                        <div class="mt-2">
                                            <select
                                                id="sold"
                                                name="sold"
                                                wire:model="sold"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            >
                                                <option></option>
                                                <option>{{ __('SIM') }}</option>
                                                <option>{{ __('NÃO') }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="sm:col-span-3">
                                        <label
                                            for="settled"
                                            class="block text-sm font-medium leading-6 text-gray-900"
                                        >{{ __('Quitado') }}</label>
                                        <div class="mt-2">
                                            <select
                                                id="settled"
                                                name="settled"
                                                wire:model="settled"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            >
                                                <option></option>
                                                <option>{{ __('SIM') }}</option>
                                                <option>{{ __('NÃO') }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="sm:col-span-3">
                                        <label
                                            for="written_down"
                                            class="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            {{ __('Escriturado') }}</label>
                                        <div class="mt-2">
                                            <select
                                                id="written_down"
                                                name="written_down"
                                                wire:model="written_down"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            >
                                                <option></option>
                                                <option>{{ __('SIM') }}</option>
                                                <option>{{ __('NÃO') }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="sm:col-span-3">
                                        <label
                                            for="judicial_process"
                                            class="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            {{ __('Processo') }}
                                        </label>
                                        <div class="mt-2">
                                            <select
                                                id="judicial_process"
                                                name="judicial_process"
                                                wire:model="judicial_process"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            >
                                                <option></option>
                                                <option>{{ __('SIM') }}</option>
                                                <option>{{ __('NÃO') }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="sm:col-span-3">
                                        <label
                                            for="authorization"
                                            class="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            {{ __('Autorizado') }}</label>
                                        <div class="mt-2">
                                            <select
                                                id="authorization"
                                                name="authorization"
                                                wire:model="authorization"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            >
                                                <option></option>
                                                <option>{{ __('SIM') }}</option>
                                                <option>{{ __('NÃO') }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="sm:col-span-3">
                                        <label
                                            for="scan_contract"
                                            class="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            {{ __('Contrato') }}</label>
                                        <div class="mt-2">
                                            <select
                                                id="scan_contract"
                                                name="scan_contract"
                                                wire:model="scan_contract"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            >
                                                <option></option>
                                                <option>{{ __('SIM') }}</option>
                                                <option>{{ __('NÃO') }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="sm:col-span-3">
                                        <label
                                            for="structure"
                                            class="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            {{ __('Estrutura') }}</label>
                                        <div class="mt-2">
                                            <select
                                                id="structure"
                                                name="structure"
                                                wire:model="structure"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            >
                                                <option></option>
                                                <option>{{ __('SIM') }}</option>
                                                <option>{{ __('NÃO') }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="sm:col-span-3">
                                        <label
                                            for="registrationNotary"
                                            class="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            {{ __('Registro') }}
                                        </label>
                                        <div class="mt-2">
                                            <select
                                                id="registrationNotary"
                                                name="registrationNotary"
                                                wire:model="registrationNotary"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            >
                                                <option></option>
                                                <option>{{ __('SIM') }}</option>
                                                <option>{{ __('NÃO') }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-span-full">
                                        <label
                                            for="description"
                                            class="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            {{ __('Descrição') }}
                                        </label>
                                        <div class="mt-2">
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    rows="3"
                                                    wire:model="description"
                                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                ></textarea>
                                        </div>
                                        <p class="mt-3 text-sm leading-6 text-gray-600"
                                        >
                                            {{ __('Uma breve descrição(se necessário).') }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="submit"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Salvar
                        </button>
                        <button
                            @click="show = false"
                            type="button"
                            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
