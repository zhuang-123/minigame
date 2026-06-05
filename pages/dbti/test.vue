<template>
  <view class="container">
    <!-- 顶部进度条 -->
    <view class="progress-container">
      <view class="progress-bar">
        <view class="progress-fill" :style="{ width: progressWidth + '%' }"></view>
      </view>
      <text class="progress-text">{{ currentQuestion + 1 }} / {{ questions.length }}</text>
    </view>
    
    <!-- 问题卡片 -->
    <view class="question-card" v-if="questions.length > 0">
      <text class="question-text">{{ questions[currentQuestion].title }}</text>
      
      <!-- 选项列表 -->
      <view class="options-list">
        <view 
          v-for="(option, index) in questions[currentQuestion].options" 
          :key="index"
          class="option-item"
          :class="{ 'selected': selectedOption === index }"
          @click="selectOption(index)"
        >
          <text class="option-label">{{ option.option }}</text>
          <text class="option-text">{{ option.option_title }}</text>
        </view>
      </view>
    </view>
    
    <!-- 加载提示 -->
    <view class="loading" v-else>
      <text class="loading-text">加载中...</text>
    </view>
    
    <!-- 导航按钮 -->
    <view class="nav-buttons">
      <button 
        class="nav-btn prev-btn"
        :disabled="currentQuestion === 0"
        @click="prevQuestion"
      >
        上一题
      </button>
      <button 
        class="nav-btn next-btn"
        :disabled="selectedOption === -1"
        @click="nextQuestion"
      >
        {{ currentQuestion === questions.length - 1 ? '完成测试' : '下一题' }}
      </button>
    </view>
  </view>
</template>

<script>
import { getQuestionsByGameId, submitTestResult } from '@/common/api.js';

export default {
  data() {
    return {
      currentQuestion: 0,
      selectedOption: -1,
      answers: [],
      questions: [],
      gameId: '609019982264664935' // DBTI游戏的固定ID（使用字符串避免精度丢失）
    };
  },
  computed: {
    progressWidth() {
      return ((this.currentQuestion + 1) / this.questions.length) * 100;
    }
  },
  methods: {
    selectOption(index) {
      this.selectedOption = index;
    },
    prevQuestion() {
      if (this.currentQuestion > 0) {
        this.currentQuestion--;
        this.selectedOption = this.answers[this.currentQuestion] || -1;
      }
    },
    nextQuestion() {
      if (this.selectedOption === -1) return;
      
      // 保存答案
      this.answers[this.currentQuestion] = this.selectedOption;
      
      if (this.currentQuestion < this.questions.length - 1) {
        // 下一题
        this.currentQuestion++;
        this.selectedOption = this.answers[this.currentQuestion] || -1;
      } else {
        // 完成测试，计算结果
        this.calculateResult();
      }
    },
    calculateResult() {
      // 构造提交的数据
      const submitData = {
        user_id: this.getUserId(), // 获取用户ID
        game_id: this.gameId,
        answers: this.questions.map((question, index) => ({
          question_id: String(question.question_id), // 转换为字符串避免精度丢失
          option_index: this.answers[index] // 用户选择的选项索引
        }))
      };
      
      // 调用服务端接口提交测试结果
      submitTestResult(submitData).then((res) => {
        if (res.data && res.data.code === 200) {
          // 提交成功，获取服务端返回的测试结果
          const result = res.data.data;
          // 构建完整的URL参数，传递所有结果字段
          const urlParams = [
            `type=${encodeURIComponent(result.personality_type || '')}`,
            `name=${encodeURIComponent(result.personality_chinese || '')}`,
            `desc=${encodeURIComponent(result.personality_desc || '')}`,
            `behavioral=${encodeURIComponent(result.behavioral || '')}`,
            `social=${encodeURIComponent(result.social || '')}`,
            `dominant=${encodeURIComponent(result.dominant || '')}`,
            `risk=${encodeURIComponent(result.risk || '')}`,
            `suggest=${encodeURIComponent(result.suggest || '')}`,
            `summary=${encodeURIComponent(result.summary || '')}`,
            `image=${encodeURIComponent(result.image || '')}`
          ].join('&');
          uni.navigateTo({
            url: `/pages/dbti/result?${urlParams}`
          });
        } else {
          // 提交失败，使用本地计算结果
          uni.showToast({
            title: '提交失败，使用本地计算',
            icon: 'none'
          });
          this.navigateToResult(this.calculateLocalResult());
        }
      }).catch(() => {
        // 网络失败，使用本地计算结果
        uni.showToast({
          title: '网络失败，使用本地计算',
          icon: 'none'
        });
        this.navigateToResult(this.calculateLocalResult());
      });
    },
    calculateLocalResult() {
      // 计算各维度得分（本地备用）
      const scores = {
        E: 0, I: 0,
        S: 0, N: 0,
        T: 0, F: 0,
        J: 0, P: 0
      };
      
      for (let i = 0; i < this.questions.length; i++) {
        const selectedIndex = this.answers[i];
        if (selectedIndex !== undefined) {
          const question = this.questions[i];
          const isReverse = question.type === '2';
          const isFirstOption = selectedIndex === 0;
          const dimensionId = question.dimension_id;
          let dimension = '';
          
          if (dimensionId === 616880564653334416) {
            dimension = (isFirstOption && !isReverse) || (!isFirstOption && isReverse) ? 'E' : 'I';
          } else if (dimensionId === 616880564653334432) {
            dimension = (isFirstOption && !isReverse) || (!isFirstOption && isReverse) ? 'S' : 'N';
          } else if (dimensionId === 616880564653334448) {
            dimension = (isFirstOption && !isReverse) || (!isFirstOption && isReverse) ? 'T' : 'F';
          } else if (dimensionId === 616880564653334464) {
            dimension = (isFirstOption && !isReverse) || (!isFirstOption && isReverse) ? 'J' : 'P';
          }
          
          if (dimension) {
            scores[dimension]++;
          }
        }
      }
      
      return '' + (scores.E > scores.I ? 'E' : 'I') +
                  (scores.S > scores.N ? 'S' : 'N') +
                  (scores.T > scores.F ? 'T' : 'F') +
                  (scores.J > scores.P ? 'J' : 'P');
    },
    navigateToResult(personalityType) {
      uni.navigateTo({
        url: `/pages/dbti/result?type=${personalityType}`
      });
    },
    getUserId() {
      // 从本地存储获取用户ID
      try {
        // 首先尝试直接获取 user_id 键（根据调试结果，存储中有 'user_id' 键）
        const userId = uni.getStorageSync('user_id');
        if (userId !== null && userId !== undefined && userId !== '') {
          const userIdStr = String(userId);
          console.log('直接获取到用户ID:', userIdStr);
          return userIdStr;
        }
        
        // 备用方案：尝试从对象中获取
        const keys = ['userInfo', 'user', 'loginInfo', 'wxUserInfo', 'userinfo', 'USERINFO'];
        const fieldNames = ['user_id', 'userId', 'id', 'openid', 'UserID', 'USER_ID'];
        
        for (const key of keys) {
          let data = uni.getStorageSync(key);
          if (data) {
            if (typeof data === 'string') {
              try {
                data = JSON.parse(data);
              } catch (e) {
                continue;
              }
            }
            
            for (const field of fieldNames) {
              if (data[field] !== undefined && data[field] !== null && data[field] !== '') {
                const userIdStr = String(data[field]);
                console.log('从对象中获取到用户ID:', userIdStr);
                return userIdStr;
              }
            }
          }
        }
      } catch (e) {
        console.error('获取用户ID失败:', e);
      }
      return '1'; // 默认用户ID
    },
    fetchQuestions() {
      // 调用服务端接口获取题目
      getQuestionsByGameId(this.gameId).then((res) => {
        if (res.data && res.data.code === 200) {
          this.questions = res.data.data;
          this.answers = new Array(this.questions.length).fill(-1);
        } else {
          uni.showToast({
            title: '获取题目失败',
            icon: 'none'
          });
        }
      }).catch(() => {
        uni.showToast({
          title: '网络请求失败',
          icon: 'none'
        });
      });
    },
    debugStorage() {
      // 尝试获取所有可能的存储键
      const possibleKeys = ['userInfo', 'user', 'loginInfo', 'wxUserInfo', 'userinfo', 'USERINFO'];
      
      console.log('=== 开始调试存储数据 ===');
      
      for (const key of possibleKeys) {
        const data = uni.getStorageSync(key);
        if (data) {
          console.log(`找到存储键 '${key}':`, typeof data);
          
          // 如果是字符串，尝试解析为JSON
          if (typeof data === 'string') {
            try {
              const parsed = JSON.parse(data);
              console.log(`解析后的JSON:`, parsed);
            } catch (e) {
              console.log(`无法解析为JSON，原始值:`, data);
            }
          } else {
            console.log(`数据内容:`, data);
          }
        } else {
          console.log(`存储键 '${key}' 不存在或为空`);
        }
      }
      
      // 尝试获取 storage 中的所有键
      try {
        const keys = uni.getStorageInfoSync().keys;
        console.log('存储中所有的键:', keys);
      } catch (e) {
        console.log('获取存储键列表失败:', e);
      }
      
      console.log('=== 调试结束 ===');
    }
  },
  onLoad() {
    // 加载题目数据
    this.fetchQuestions();
  }
};
</script>

<style scoped>
.container {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.progress-container {
  margin: 30rpx 0;
}

.progress-bar {
  width: 100%;
  height: 10rpx;
  background-color: #e0e0e0;
  border-radius: 5rpx;
  overflow: hidden;
  margin-bottom: 10rpx;
}

.progress-fill {
  height: 100%;
  background-color: #0B63F6;
  border-radius: 5rpx;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 20rpx;
  color: #666;
  text-align: right;
}

.question-card {
  background-color: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.question-text {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  line-height: 40rpx;
  margin-bottom: 40rpx;
  display: block;
}

.options-list {
  margin-top: 20rpx;
}

.option-item {
  padding: 25rpx;
  border: 2rpx solid #e0e0e0;
  border-radius: 15rpx;
  margin-bottom: 20rpx;
  transition: all 0.3s ease;
}

.option-item:hover {
  background-color: #f0f0f0;
}

.option-item.selected {
  background-color: #e6f0ff;
  border-color: #0B63F6;
}

.option-label {
  font-size: 24rpx;
  font-weight: bold;
  color: #0B63F6;
  margin-right: 10rpx;
}

.option-text {
  font-size: 24rpx;
  color: #333;
  line-height: 36rpx;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400rpx;
}

.loading-text {
  font-size: 28rpx;
  color: #999;
}

.nav-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 40rpx;
}

.nav-btn {
  width: 45%;
  padding: 20rpx 0;
  border-radius: 50rpx;
  font-size: 24rpx;
  font-weight: 600;
}

.prev-btn {
  background-color: #fff;
  color: #666;
  border: 2rpx solid #e0e0e0;
}

.next-btn {
  background-color: #0B63F6;
  color: #fff;
}

.next-btn:disabled {
  background-color: #ccc;
}

.prev-btn:disabled {
  background-color: #f0f0f0;
  color: #999;
}

.nav-btn::after {
  border: none;
}
</style>