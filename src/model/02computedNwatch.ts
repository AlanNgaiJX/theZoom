import { ref, computed } from "vue";

const firstName = ref("Alan");
const lastName = ref("Winson");

const fullName = computed(() => {
    return firstName.value + " " + lastName.value;
});
// console.log(fullName.value);

const fullName2 = computed({
    get(): string {
        return firstName.value + lastName.value;
    },
    set(fullName: string): void {
        let sp = fullName.split(' ');
        if (sp.length > 1) {
            firstName.value = sp[0];
            lastName.value = sp[1];
        }
    },
});

fullName2.value = "Android Google";
console.log(firstName.value, lastName.value);

