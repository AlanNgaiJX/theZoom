import { ref, reactive, toRefs, computed } from "vue";

const data = reactive({
    firstName: "Alan",
    lastName: "Winson",
});

// const {firstName, lastName} = toRefs(data);

const fullName = computed({
    get() {
        return data.firstName + " " + data.lastName;
    },
    set(fullName: string) {
        let sp = fullName.split(" ");
        if (sp.length > 1) {
            data.firstName = sp[0];
            data.lastName = sp[1];
        }
    },
});
