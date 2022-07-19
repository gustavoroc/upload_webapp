<template>
    <form @submit.prevent="sendFile" enctype="multipart/form-data">

        <div
         v-if="message"
         :class="`message ${error ? 'is-danger' : 'is-success'}`"
        >
            <div class="message-body">{{message}}</div>
        </div>

        <div class="field">

            <div class="file is-boxed is-primary">
                <label class="file-label">

                    <input 
                        type="file"
                        ref="file"
                        @change="selectFile"
                        class="file-input"
                    />

                    <span class="file-cta">
                        <span class="file-icon">
                            <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label">
                            Choose a file...
                        </span>
                    </span>

                    <span v-if="file" class="file-name">
                       {{file.name}}
                    </span>

                </label>
            </div>

        </div>

            <div class="field">
                <button class="button is-info">Send</button>
            </div>
    </form>
            <div class="field m-5" >
                <button class="button is-info" @click.prevent="downloadFile">Download</button>
            </div>
</template>


<script>
import axios from "axios";
export default {
    name: "SimpleUpload",

    data() {
        return {
            file: '', //Type of File.
            message: '',
            error: false,
            data: ""
        }
    },

    methods: {
        selectFile() {
            this.file = this.$refs.file.files[0]; // this.$refs.file => The dom's element;
            this.error = false;
            this.message = "";
        },

        async sendFile() {
            const formData = new FormData(); // The format for files upload.
            formData.append("file", this.file);
            try {
                const data = await axios.post("/upload", formData);
                this.message = "File has been uploaded";
                this.file = "";
                this.error = false;
                this.data = data.data.file;
                console.log(this.data.filename);

            } catch(err) {
                this.message = "something went wrong";
                this.error = true;
            }
        },

        async downloadFile() {
            const data = await axios.get(`/download/${this.data.filename}`, { responseType: 'blob' });
            console.log(data);
            const fileURL = window.URL.createObjectURL(new Blob([data.data]));
            let fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', this.data.filename)
            document.body.appendChild(fileLink)
            fileLink.click();
        }
    }
}
</script>