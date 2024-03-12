<template>
  <div class="homePage">
    <div class="contain">
      <div>
      <!--工作信息-->
        <div class="title">工作信息</div>
        <div class="content">
          <el-form :inline="true" :model="reportInfo">
            <el-form-item label="工作编号">
              <el-input v-model="reportInfo.reportNum" placeholder="" style="width: 120px"/>
            </el-form-item>
            <el-form-item label-width="50px">
              <el-button type="default" @click="refreshNum">刷新编号</el-button>
            </el-form-item>
            <el-form-item label="油品种类" label-width="100px">
              <el-select v-model="reportInfo.oilType" placeholder="请选择" style="width: 150px">
                <el-option
                    v-for="item in oilTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="液态化工品" label-width="100px">
              <el-select v-model="reportInfo.liquidChemicals" placeholder="请选择" style="width: 150px" @change="handleChange">
                <el-option
                    v-for="item in chemicalList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
              <el-select v-model="reportInfo.volCorrection" placeholder="请选择" style="width: 150px">
                <el-option
                    v-for="item in volCorrectionList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div>
      <!--数据录入-->
        <div class="title">数据录入</div>
        <div class="dataContent">
          <div style="width: 30%; height: 100%">
            <el-form :model="dataImport">
              <el-form-item label="油罐编号">
                <el-select v-model="dataImport.tankNum" placeholder="请选择" style="width: 180px" @change="handleSelect">
                  <el-option
                      v-for="item in demoMock.tankList"
                      :key="item.tankNum"
                      :label="item.tankNum"
                      :value="item.tankNum"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="检尺时间">
                <el-date-picker v-model="dataImport.checkTime"></el-date-picker>
              </el-form-item>
              <el-form-item label="油罐类型">
                <el-radio-group v-model="dataImport.tankType">
                  <el-radio value="保温罐">保温罐</el-radio>
                  <el-radio value="非保温罐">非保温罐</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
          <div style="width: 70%;height: 100%">
            <el-row style="font-size: 14px;text-align: center;">
              <el-col :span="1"><div></div></el-col>
              <el-col :span="4"><div>油品高度(mm)</div></el-col>
              <el-col :span="4"><div>底水高度(mm)</div></el-col>
<!--              <el-col :span="3"><div>含水率(%)</div></el-col>-->
<!--              <el-col :span="4"><div>环境温度(°C)</div></el-col>-->
              <el-col :span="4"><div>油品温度(°C)</div></el-col>
              <el-col :span="4"><div>标准密度(kg/m³)</div></el-col>
              <el-col :span="4"><div>浮顶质量(t)</div></el-col>
            </el-row>
            <el-row style="font-size: 14px; margin-top: 5px">
              <el-col :span="1"><div style="margin: 3px 2px 0 0;">前尺</div></el-col>
              <el-col :span="4"><el-input v-model="dataImport.frontOilHeight" style="padding-right: 5px"/></el-col>
              <el-col :span="4"><el-input v-model="dataImport.frontBottomWater" style="padding-right: 5px" disabled /></el-col>
              <el-col :span="4"><el-input v-model="dataImport.frontOilTemperature" style="padding-right: 5px" /></el-col>
              <el-col :span="4"><el-input v-model="dataImport.frontStandardDensity" style="padding-right: 5px" /></el-col>
              <el-col :span="4"><el-input v-model="dataImport.frontQuantity" style="padding-right: 5px" /></el-col>
            </el-row>
            <el-row style="font-size: 14px; margin-top: 5px">
              <el-col :span="1"><div style="margin: 3px 2px 0 0;">后尺</div></el-col>
              <el-col :span="4"><el-input v-model="dataImport.backOilHeight" style="padding-right: 5px"/></el-col>
              <el-col :span="4"><el-input v-model="dataImport.backBottomWater" style="padding-right: 5px" disabled /></el-col>
              <el-col :span="4"><el-input v-model="dataImport.backOilTemperature" style="padding-right: 5px" /></el-col>
              <el-col :span="4"><el-input v-model="dataImport.backStandardDensity" style="padding-right: 5px" /></el-col>
              <el-col :span="4"><el-input v-model="dataImport.backQuantity" style="padding-right: 5px" /></el-col>
            </el-row>
            <el-row style="margin-top: 5px">
              <el-col :span="2" style="margin: 0 10px 0 30px;">
<!--                <el-button style="width: 100%;">存入待算</el-button>-->
              </el-col>
              <el-col :span="7" style="margin: 0 10px;">
                <el-button style="width: 100%;" @click="calStart">开始计算</el-button>
              </el-col>
              <el-col :span="7" style="margin: 0 10px;">
                <el-button style="width: 100%;" @click="clearInput">清空输入</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="bottomPart">
      <!--待算油管及计算结果-->
        <div style="width: 30%;height: 100%">
<!--          <div>待算油罐</div>-->
<!--          <div class="bottomPartLeft">-->
<!--            <div v-for="(item, index) in dataList" :key="index">-->
<!--              <div :class="{'selectedCss':index === currentIndex}">{{item.value}}</div>-->
<!--            </div>-->
<!--            <div style="margin-top: 20px">状态: {{currentStatus}}</div>-->
<!--            <div style="margin-top: 5px;"><el-button style="width: 100%">删除选中项</el-button></div>-->
<!--            <div style="margin-top: 5px;"><el-button style="width: 100%">清除所有结果</el-button></div>-->
<!--          </div>-->
        </div>
        <div style="width: 70%">
          <div>计算结果</div>
          <div>
            <el-tabs
                v-model="tabName"
                type="card"
                class="demo-tabs"
                @tab-click="handleClick"
            >
              <el-tab-pane label="国标算法" name="first">
                <div style="width: 100%">
                  <el-row style="font-size: 14px;text-align: center;">
                    <el-col :span="1"><div></div></el-col>
                    <el-col :span="4"><div>查表体积(m³)</div></el-col>
                    <el-col :span="3"><div>标准体积(m³)</div></el-col>
                    <el-col :span="4"><div>扣水量(t)</div></el-col>
                    <el-col :span="4"><div>纯油量(t)</div></el-col>
                  </el-row>
                  <el-row style="font-size: 14px; margin-top: 5px">
                    <el-col :span="1"><div style="margin: 3px 2px 0 0;">前尺</div></el-col>
                    <el-col :span="4"><el-input v-model="calResult.frontTableVol" style="padding-right: 5px"/></el-col>
                    <el-col :span="3"><el-input v-model="calResult.frontStandardVol" style="padding-right: 5px" /></el-col>
                    <el-col :span="4"><el-input v-model="calResult.frontWaterRetention" style="padding-right: 5px" /></el-col>
                    <el-col :span="4"><el-input v-model="calResult.frontPureOil" style="padding-right: 5px" /></el-col>
                  </el-row>
                  <el-row style="font-size: 14px; margin-top: 5px">
                    <el-col :span="1"><div style="margin: 3px 2px 0 0;">后尺</div></el-col>
                    <el-col :span="4"><el-input v-model="calResult.backTableVol" style="padding-right: 5px"/></el-col>
                    <el-col :span="3"><el-input v-model="calResult.backStandardVol" style="padding-right: 5px" /></el-col>
                    <el-col :span="4"><el-input v-model="calResult.backWaterRetention" style="padding-right: 5px" /></el-col>
                    <el-col :span="4"><el-input v-model="calResult.backPureOil" style="padding-right: 5px" /></el-col>
                  </el-row>
                </div>
              </el-tab-pane>
            </el-tabs>
            <div>
              <div style="margin-top: 10px;">
                <el-row style="font-size: 14px;text-align: center;">
                  <el-col :span="5"></el-col>
                  <el-col :span="3"><div>标准体积(m³)</div></el-col>
                  <el-col :span="4"><div>扣水量(t)</div></el-col>
                  <el-col :span="4"><div>纯油量(t)</div></el-col>
                </el-row>
                <el-row style="font-size: 14px; margin-top: 5px">
                  <el-col :span="5"><div style="margin: 4px 0 0 50px;">总收付量统计</div></el-col>
                  <el-col :span="3"><el-input v-model="totalResult.totalStandardVol" style="padding-right: 5px" /></el-col>
                  <el-col :span="4"><el-input v-model="totalResult.totalWaterRetention" style="padding-right: 5px" /></el-col>
                  <el-col :span="4"><el-input v-model="totalResult.totalPureOil" style="padding-right: 5px" /></el-col>
                </el-row>
                <el-row style="font-size: 14px; margin-top: 5px">
                  <el-col :span="8"></el-col>
                  <el-col :span="4" style="text-align: center"><div style="padding-top: 5px;">修正收付量</div></el-col>
                  <el-col :span="4"><el-input v-model="totalResult.correctReceivedPaid" style="padding-right: 5px" /></el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
<!--    <div class="bottomBtn">-->
<!--      <el-button>保存</el-button>-->
<!--      <el-button>生成Excel</el-button>-->
<!--      <el-button>关闭</el-button>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  name: "homeIndex",
  data() {
    return {
      demoMock: {},
      currentIndex: 0,
      reportInfo: {
        reportNum: '',
        oilType: '液态化工品',
        liquidChemicals: '',
        volCorrection: '',
      },
      oilTypeList: [{
        label: '液态化工品',
        value: '液态化工品',
      }],
      chemicalList: [{
        label: '对二甲苯',
        value: '对二甲苯',

      },{
        label: '醋酸',
        value: '醋酸',
      },{
        label: '醋酸正丙酯',
        value: '醋酸正丙酯',
      }],
      volCorrectionList: [{
        label: '体积修正法',
        value: '体积修正法',
      },{
        label: '密度修正法',
        value: '密度修正法',
      }],
      dataImport: {
        tankNum: '',
        checkTime: '',
        tankType: '',
        frontOilHeight: '', //油品高度
        frontBottomWater: '', //底水高度
        frontOilTemperature: '', //油品温度
        frontStandardDensity: '', //标准密度
        frontQuantity: '',//浮顶质量
        backOilHeight: '', //油品高度
        backBottomWater: '', //底水高度
        backOilTemperature: '', //油品温度
        backStandardDensity: '', //标准密度
        backQuantity: '',//浮顶质量
      },
      dataList: [{
        value: 'F-7001P',
      },{
        value: 'F-7002',
      }],
      currentStatus: '已完成计算',
      tabName: 'first',
      calResult: {
        frontTableVol: '', //查表体积
        frontStandardVol: '', //标准体积
        frontWaterRetention: '', //扣水量
        frontPureOil: '', //纯油量
        backTableVol: '',
        backStandardVol: '',
        backWaterRetention: '',
        backPureOil: '',
      },
      totalResult: {
        totalStandardVol: '',
        totalWaterRetention: '',
        totalPureOil: '',
        correctReceivedPaid: '',
      },
      densityCorrectionFactor: '', //密度修正系数
      volumeCorrectionFactor: '', //体积温度修正系数
      frontTwentyDegree: '', //前尺二十度密度
      backTwentyDegree: '', //后尺二十度密度
      curTankInfo: {},//输入的油品高度对应的数据
      coefficient: '0.000012',
      kqflxzz: '0.0011', //空气浮力修正值
      frontGbxzxs: '', //罐壁修正系数
      frontTjxzxs: '', //体积修正系数
      frontFdpctj: '', //浮顶排出体积
      frontKqmd: '', //空气密度
      backGbxzxs: '', //罐壁修正系数
      backTjxzxs: '', //体积修正系数
      backFdpctj: '', //浮顶排出体积
      backKqmd: '', //空气密度
      correctArr: [{
        first: '4',
        last: '8',
        level: '1.0009538'
      },{
        first: '8',
        last: '12',
        level: '1.0015405'
      },{
        first: '12',
        last: '16',
        level: '1.0016543'
      }],
    }
  },
  mounted() {
    this.demoMock = this.$demoMock;
  },
  created() {},
  methods: {
    //刷新编号
    refreshNum() {},
    //tab
    handleClick() {},
    //下拉框
    handleChange(option) {
      if(option === '对二甲苯') {
        this.densityCorrectionFactor = '0.00087';
        this.volumeCorrectionFactor = '0.00101';
      } else if(option === '醋酸') {
        this.densityCorrectionFactor = '0.00107';
        this.volumeCorrectionFactor = '0.00112';
      } else {
        this.densityCorrectionFactor = '0.00114';
        this.volumeCorrectionFactor = '0.00110';
      }
    },
    handleSelect(option) {
      console.log('dd', option);
    },
    //开始计算
    calStart() {
      // if(!this.dataImport.frontOilHeight || !this.dataImport.frontOilTemperature || !this.dataImport.frontStandardDensity || !this.dataImport.frontQuantity || !this.dataImport.backOilHeight || !this.dataImport.backOilTemperature || !this.dataImport.backStandardDensity || !this.dataImport.backQuantity) {
      //   this.$notify.warning({
      //     title: '提示',
      //     message: '当前输入框都为必填项',
      //   })
      // } else {
        //计算结果
        // 前尺
        //十五度密度
        this.frontTwentyDegree =(parseFloat(this.dataImport.frontStandardDensity) - 5 * parseFloat(this.densityCorrectionFactor)).toFixed(5);
        this.frontTwentyDegree = this.calcDegree(this.frontTwentyDegree).toFixed(4);
        this.demoMock.tankList.forEach((val) => {
          if(val.tankNum === this.dataImport.tankNum) {
            val.tankInfo.forEach((item) => {
              if(item.ypgd === this.dataImport.frontOilHeight) {
                this.curTankInfo = item;
              }
            })
          }
        })
        this.calResult.frontTableVol = ((parseFloat(this.curTankInfo.num) + parseFloat(this.curTankInfo.jylxz) * parseFloat(this.frontTwentyDegree)) / 1000).toFixed(3);
        this.frontGbxzxs = (1 + (parseFloat(this.dataImport.frontOilTemperature) - 20) * 3 * parseFloat(this.coefficient)).toFixed(6);
        this.frontTjxzxs = (1 - (parseFloat(this.dataImport.frontOilTemperature) - 15) * parseFloat(this.volumeCorrectionFactor)).toFixed(4);
        this.frontFdpctj = (parseFloat(this.dataImport.frontQuantity) / parseFloat(this.dataImport.frontStandardDensity)).toFixed(3);
        this.calResult.frontStandardVol = (parseFloat(this.calResult.frontTableVol) * parseFloat(this.frontGbxzxs) * parseFloat(this.frontTjxzxs) - parseFloat(this.frontFdpctj)).toFixed(3);
        this.frontKqmd = parseFloat(this.dataImport.frontStandardDensity) - parseFloat(this.kqflxzz);
        this.calResult.frontWaterRetention = this.calResult.frontPureOil = (parseFloat(this.frontKqmd) * parseFloat(this.calResult.frontStandardVol)).toFixed(3);

        //后尺
        //十五度密度
        this.backTwentyDegree =(parseFloat(this.dataImport.backStandardDensity) - 5 * parseFloat(this.densityCorrectionFactor)).toFixed(5);
        this.backTwentyDegree = this.calcDegree(this.backTwentyDegree).toFixed(4);
        this.demoMock.tankList.forEach((val) => {
          if(val.tankNum === this.dataImport.tankNum) {
            val.tankInfo.forEach((item) => {
              if(item.ypgd === this.dataImport.backOilHeight) {
                this.curTankInfo = item;
              }
            })
          }
        })
        this.calResult.backTableVol = ((parseFloat(this.curTankInfo.num) + parseFloat(this.curTankInfo.jylxz) * parseFloat(this.backTwentyDegree)) / 1000).toFixed(3);
        this.backGbxzxs = (1 + (parseFloat(this.dataImport.backOilTemperature) - 20) * 3 * parseFloat(this.coefficient)).toFixed(6);
        this.backTjxzxs = (1 - (parseFloat(this.dataImport.backOilTemperature) - 15) * parseFloat(this.volumeCorrectionFactor)).toFixed(4);
        this.backFdpctj = (parseFloat(this.dataImport.backQuantity) / parseFloat(this.dataImport.backStandardDensity)).toFixed(3);
        this.calResult.backStandardVol = (parseFloat(this.calResult.backTableVol) * parseFloat(this.backGbxzxs) * parseFloat(this.backTjxzxs) - parseFloat(this.backFdpctj)).toFixed(3);
        this.backKqmd = parseFloat(this.dataImport.backStandardDensity) - parseFloat(this.kqflxzz);
        this.calResult.backWaterRetention = this.calResult.backPureOil = (parseFloat(this.backKqmd) * parseFloat(this.calResult.backStandardVol)).toFixed(3);

        //总收付量统计
        this.totalResult.totalStandardVol = (parseFloat(this.calResult.backStandardVol) - parseFloat(this.calResult.frontStandardVol)).toFixed(3);
        this.totalResult.totalWaterRetention = (parseFloat(this.calResult.backWaterRetention) - parseFloat(this.calResult.frontWaterRetention)).toFixed(3);
        this.totalResult.totalPureOil = (parseFloat(this.calResult.backPureOil) - parseFloat(this.calResult.frontPureOil)).toFixed(3);

        //修正收付良
        this.correctArr.forEach((item) => {
          if(parseFloat(this.dataImport.backOilHeight) / 1000 > parseFloat(item.first) && parseFloat(this.dataImport.backOilHeight)/1000 < parseFloat(item.last)) {
            this.totalResult.correctReceivedPaid = (parseFloat(this.dataImport.backOilHeight) * item.level).toFixed(3);
          }
        })
      // }
    },
    calcDegree(val) {
      let temp = val.split('');
      let curVal = temp[temp.length - 1];
      if(curVal === '5') {
        val = val + '1';
      }
      return parseFloat(val)
    },
    //清空输入框
    clearInput() {
      this.reportInfo.liquidChemicals = '';
      this.reportInfo.volCorrection = '';

      this.dataImport.tankNum = '';
      this.dataImport.checkTime = '';
      this.dataImport.tankType = '';

      this.dataImport.frontOilHeight = '';
      this.dataImport.frontOilTemperature = '';
      this.dataImport.frontStandardDensity = '';
      this.dataImport.frontQuantity = '';
      this.dataImport.backOilHeight = '';
      this.dataImport.backOilTemperature = '';
      this.dataImport.backStandardDensity = '';
      this.dataImport.backQuantity = '';

      this.calResult.frontTableVol = '';
      this.calResult.frontStandardVol = '';
      this.calResult.frontWaterRetention = '';
      this.calResult.frontPureOil = '';
      this.calResult.backTableVol = '';
      this.calResult.backStandardVol = '';
      this.calResult.backWaterRetention = '';
      this.calResult.backPureOil = '';

      this.totalResult.totalStandardVol = '';
      this.totalResult.totalWaterRetention = '';
      this.totalResult.totalPureOil = '';
      this.totalResult.correctReceivedPaid = '';
    }
  },
}
</script>

<style scoped>
.homePage {
  width: 100%;
  height: 100%;
}
.contain {
  width: 1200px;
  height: 600px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}
.title{
  display: flex;
  justify-content: flex-start;
}
.content {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.dataContent {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.bottomPart {
  display: flex;
  flex-direction: row;
}
.bottomPartLeft {
  width: 150px;
  height: 100px;
  display: flex;
  flex-direction: column;
}
.selectedCss {
  background-color: deepskyblue;
  color: #ffffff;
}
.bottomBtn {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>