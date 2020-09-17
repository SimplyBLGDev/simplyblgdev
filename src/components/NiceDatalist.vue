<template>
    <div style="position: relative">
        <input ref="in" class="bg in" type="text" @focus="showList" @blur="closeList" @click="search" @input="search">
        <div ref="drop" class="drop">
            <div class="bg" width="100%" v-for="entry in searchResults" :key="entry.value" style="display:flex;justify-content:center;align-items:center;" @mousedown="chooseOption(entry.name)">
                {{ entry.name }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "NiceDatalist",
    props: ['list'],
    data: () => ({
        searchResults: []
    }),
    methods: {
        showList: function() {
            if (!this.$refs.drop.classList.contains("show")) {
                this.$refs.drop.classList.add("show");
            }
        },
        closeList: function() {
            if (this.$refs.drop.classList.contains("show")) {
                this.$refs.drop.classList.remove("show");
            }
        },
        chooseOption: function(value) {
            this.$refs.in.value = value;
            this.search();
        },
        search: function() {
            var text = this.$refs.in.value.toLowerCase();

            var startMatches = [];
            var otherMatches = [];
            for (var i = 0; i < this.list.length; i++) {
                var optionText = this.list[i].name;
                if (optionText.toLowerCase().startsWith(text)) {
                    startMatches.push({
                        "name":optionText
                    });
                } else if (optionText.toLowerCase().includes(text)) {
                    otherMatches.push({
                        "name":optionText
                    });
                }
            }

            this.searchResults = startMatches.concat(otherMatches);
        }
    }
}
</script>

<style scoped>
    .bg.in {
        border:0;
        width: 100%;
        height:2.4rem;
        max-height:100%;
        text-align: center;
        color:whitesmoke;
        border-bottom-left-radius: 1rem;
    }
    .in:focus {
        -webkit-animation: brbordersq 0.25s forwards; /* Chrome, Safari, Opera */
        animation: brbordersq 0.25s forwards;
    }
    @keyframes brbordersq {
        from {border-bottom-left-radius: 1rem;}
        to {border-bottom-left-radius: 3px;}
    }
    .bg {
        background-color:#328d2b;
        -webkit-box-shadow: 1px 1px 5px -3px var(--box-shadow-color);
        -moz-box-shadow: 1px 1px 5px -3px var(--box-shadow-color);
        box-shadow: 1px 1px 5px -3px var(--box-shadow-color);
        --box-shadow-color: rgb(0, 0, 0, 0.75);
        border-radius: 3px;
        height: 2.4rem;
    }
    .drop>.bg {
        vertical-align:middle;
        margin-bottom: 2px;
        margin-top: 2px;
    }
    .drop:first-child {
        margin-top: 0;
    }
    .drop>.bg:nth-child(-n+5) {
        -webkit-animation: dropDrop 0.2s forwards; /* Chrome, Safari, Opera */
        animation: dropDrop 0.2s forwards;
    }
    .drop>.bg:hover {
        background-color:#369b2e;
    }
    @keyframes dropDrop {
        from {margin-top: -2.4rem;}
        to {margin-top: 2px;}
    }
    .drop>.bg:last-child {
        border-bottom-left-radius: 1rem;
    }
    .drop {
        position: absolute;
        display: none;
        width: 100%;
        height: 200px;
        z-index: 1;
        border-radius: 3px;
        border-bottom-left-radius: 1rem;
        margin-top: 6px;
        overflow-y: scroll;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none;  /* IE 10+ */
    }
    .drop::-webkit-scrollbar { /* WebKit */
        width: 0px;
    }
    .show {
        display: block;
        -webkit-animation: showOpa 0.25s forwards; /* Chrome, Safari, Opera */
        animation: showOpa 0.25s forwards;
    }
    @keyframes showOpa {
        from {opacity: 0;}
        to {opacity: 1;}
    }
    .pokeIcon {
        image-rendering: pixelated;
        scale: 200%;
        float: left;
        margin-bottom: 2px;
        margin-right: -5px;
        margin-left: -8px;
    }
</style>