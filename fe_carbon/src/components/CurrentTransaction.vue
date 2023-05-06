<template>
    <el-container>
        <el-header style="margin-top: 50px">
            <el-descriptions title="当前事务详情" border>
                <template #extra>
                    <el-button type="primary" @click="changeTransaction"> change </el-button>
                </template>
                <el-descriptions-item label="title">{{ description.title }}</el-descriptions-item>
                <el-descriptions-item label="total_cost">{{ description.cost }}</el-descriptions-item>
                <el-descriptions-item label="total_emission">{{ description.emission }}</el-descriptions-item>
                <el-descriptions-item label="nodes">{{ description.nodes }}</el-descriptions-item>
                <el-descriptions-item label="select transaction">

                    <el-select v-model="transactionId" class="m-2" placeholder="Select" size="large">
                        <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id" />
                    </el-select>



                </el-descriptions-item>
            </el-descriptions>
        </el-header>

        <el-main class="radius">

        </el-main>

        <el-footer></el-footer>
    </el-container>
</template>

<script>

import { ref } from "vue"

export default {
    name: "CurrentTransaction",
    setup() {

        const transactionId = ref('')

        const description = {
            title: "transaction_20230430",
            cost: "867991.89",
            emission: "1340",
            nodes: "S1,S2,P1,P7,D2,C1,C4"
        }

        const changeTransaction = () => {
            console.log(transactionId.value);
        }

        const options = [
            {
                label: "transaction1",
                id: "1"
            },
            {
                label: "transaction2",
                id: "2"
            },
            {
                label: "transaction3",
                id: "3"
            }
        ]

        return {
            description,
            options,
            transactionId,
            changeTransaction
        }
    }
}
</script>