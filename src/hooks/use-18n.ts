import { ref, onMounted } from 'vue';
import vuei18n from '@/i18n/lang/zh';
import { Indexable } from 'fx-front-utils';

function use18n() {

    const vuei18nKeys = ref<string[]>([]);

    onMounted(() => {
        vuei18nKeys.value = Object.keys(vuei18n);
    })

    function get18nName(key:string) {
        return (vuei18n as Indexable<string>)[key];
    }

    return {
        vuei18nKeys,
        get18nName
    };
}

export { use18n };
