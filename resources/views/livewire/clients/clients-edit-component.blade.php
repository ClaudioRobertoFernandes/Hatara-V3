<div>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Editar cliente: '.$user->name) }}
        </h2>
    </x-slot>
    <div class="py-6">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="overflow-hidden sm:rounded-lg">
                <div class="isolate bg-white px-6 py-5 sm:py-6 lg:px-8">
                    <div
                        class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                        aria-hidden="true">
                        <div
                            class="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                            style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
                    </div>
                    <div class="mx-auto max-w-2xl text-center">
                        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Dados do cliente</h2>
                    </div>
                    <form action="#" method="POST" class="mx-auto mt-16 max-w-xl sm:mt-20">
                        <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div>
                                <label for="first-name"
                                       class="block text-sm font-semibold leading-6 text-gray-900">Nome</label>
                                <div class="mt-2.5">
                                    <input type="text"
                                           name="first-name"
                                           id="first-name"
                                           autocomplete="given-name"
                                           class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                </div>
                            </div>
                            <div>
                                <label for="email"
                                       class="block text-sm font-semibold leading-6 text-gray-900">E-mail</label>
                                <div class="mt-2.5">
                                    <input type="email" name="email" id="email" autocomplete="email"
                                           class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                </div>
                            </div>
                            {{--                            <div class="flex gap-x-4 sm:col-span-2" x-data="{ on: false }">--}}
                            {{--                                <div class="flex h-6 items-center">--}}
                            {{--                                    <button type="button" class="flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-indigo-600" role="switch" aria-checked="true" x-ref="switch" x-state:on="Enabled" x-state:off="Not Enabled" :class="{ 'bg-indigo-600': on, 'bg-gray-200': !(on) }" aria-labelledby="switch-1-label" :aria-checked="on.toString()" @click="on = !on">--}}
                            {{--                                        <span class="sr-only">Agree to policies</span>--}}
                            {{--                                        <span aria-hidden="true" class="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out translate-x-3.5" x-state:on="Enabled" x-state:off="Not Enabled" :class="{ 'translate-x-3.5': on, 'translate-x-0': !(on) }"></span>--}}
                            {{--                                    </button>--}}
                            {{--                                </div>--}}
                            {{--                                <label class="text-sm leading-6 text-gray-600" id="switch-1-label" @click="on = !on; $refs.switch.focus()">--}}
                            {{--                                    Status atual do cliente--}}
                            {{--                                </label>--}}
                            {{--                            </div>--}}
                            <div>
                                <label for="cpfcnpj" class="block text-sm font-semibold leading-6 text-gray-900">CPF/CNPJ</label>
                                <div class="mt-2.5">
                                    <input type="text" name="cpfcnpj" id="cpfcnpj"
                                           class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                </div>
                            </div>
                            <div>
                                <label for="rg" class="block text-sm font-semibold leading-6 text-gray-900">Rg</label>
                                <div class="mt-2.5">
                                    <input type="text" name="rg" id="rg"
                                           class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                </div>
                            </div>
                            <div>
                                <label for="cellphone" class="block text-sm font-semibold leading-6 text-gray-900">Celular</label>
                                <div class="mt-2.5">
                                    <input type="text" name="cellphone" id="cellphone"
                                           class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                </div>
                            </div>
                            <div>
                                <label for="phone"
                                       class="block text-sm font-semibold leading-6 text-gray-900">Telefone</label>
                                <div class="mt-2.5">
                                    <input type="text" name="phone" id="phone"
                                           class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                </div>
                            </div>
                            <div>
                                <label for="birth_date" class="block text-sm font-semibold leading-6 text-gray-900">Data
                                    de nascimento</label>
                                <div class="mt-2.5">
                                    <input type="text" name="birth_date" id="birth_date"
                                           class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                </div>
                            </div>
                            <div>
                                <label for="status"
                                       class="block text-sm font-semibold leading-6 text-gray-900">Rg</label>
                                <div class="mt-2.5">
                                    <input type="text" name="status" id="status" autocomplete="family-name"
                                           class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                </div>
                            </div>
                            <div>
                                <label for="status" class="block text-sm font-semibold leading-6 text-gray-900">Status
                                    atual do cliente</label>
                                <div class="mt-2.5">
                                    <input type="text" name="status" id="status" autocomplete="family-name"
                                           class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                </div>
                            </div>
                            <div class="sm:col-span-2">
                                <label for="company"
                                       class="block text-sm font-semibold leading-6 text-gray-900">Company</label>
                                <div class="mt-2.5">
                                    <input type="text" name="company" id="company" autocomplete="organization"
                                           class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                </div>
                            </div>
                        </div>
                        <div class="mt-10">
                            <button type="submit"
                                    class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Editar
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
</div>
