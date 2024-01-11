<?php

namespace App\Livewire\Attachment;

use Livewire\Component;

class AttachmentComponent extends Component
{

    public function render()
    {
        ds(123)->info();
        return view('livewire.attachment.attachment-component');
    }
}
