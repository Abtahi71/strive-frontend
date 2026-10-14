

"use client";

import { useState } from "react";
import {
  useDailyLeadership,
  useTaskLeadership,
  useActivityLeadership,
  useCurrentUser,
  useTaskCompleted
} from "@/src/hooks/useUsers";
import { useActivity } from "@/src/hooks/useActivities";
import { useCreateProgress } from "../hooks/useUsers";
import DailyProgressAnalytics from "./DailyProgressAnalytics";
import TaskProgressHistory from "./TaskProgressHistory";
import TaskAchievements from "./TaskAchievements";
import CreateTaskAchievement from "./CreateTaskAchievement";
import ChecklistProgress from "./ChecklistProgress";


import {
  // Existing
  Trophy,
  Flame,
  Star,
  Crown,
  Medal,
  Target,
  Dumbbell,
  Heart,
  Zap,
  Shield,

  // Fitness & Health
  Activity,
  Bike,
  Footprints,
  Mountain,
  Apple,
  Droplet,
  Coffee,
  Salad,
  Beef,

  // Mind & Learning
  Brain,
  Book,
  BookOpen,
  GraduationCap,
  Lightbulb,
  Puzzle,
  Pen,
  Pencil,
  Notebook,
  Library,
  Microscope,
  Atom,

  // Growth & Progress
  TrendingUp,
  TrendingDown,
  LineChart,
  BarChart,
  BarChart3,
  ArrowUp,
  ArrowUpRight,
  ArrowRight,
  Rocket,
  Sparkles,
  Sprout,
  TreePine,

  // Mindfulness & Wellness
  Leaf,
  Flower,
  Flower2,
  Feather,
  Waves,
  Wind,
  Cloud,
  Smile,
  Laugh,
  Meh,
  Frown,
  Sparkle,

  // Wealth & Career
  DollarSign,
  Coins,
  PiggyBank,
  Wallet,
  Briefcase,
  Building,
  Award,
  BadgeCheck,
  Gem,
  Diamond,
  Key,

  // Social & Relationships
  Users,
  UserCheck,
  UserPlus,
  Handshake,
  HeartHandshake,
  MessageCircle,
  MessageSquare,
  Send,
  Gift,
  PartyPopper,

  // Travel & Adventure
  Map,
  MapPin,
  Compass,
  Globe,
  Plane,
  Car,
  Ship,
  Train,
  Tent,
  Backpack,
  Luggage,

  // Creativity & Hobbies
  Palette,
  Music,
  Music2,
  Guitar,
  Camera,
  Video,
  Mic,
  Paintbrush,
  Scissors,
  Hammer,
  Wrench,

  // Nature & Outdoors
  Sun,
  Moon,
  CloudRain,
  Snowflake,
  Trees,
  TreeDeciduous,
  Bird,
  Fish,
  Bug,
  PawPrint,

  // Achievements & Rewards
  CheckCircle,
  CheckCircle2,
  ThumbsUp,

  // Time & Consistency
  Calendar,
  CalendarCheck,
  CalendarDays,
  Clock,
  Timer,
  Hourglass,
  Watch,
  AlarmClock,
  Repeat,
  RefreshCw,
  RotateCw,

  // Energy & Power
  Bolt,
  Battery,
  BatteryFull,
  BatteryCharging,
  Power,
  Plug,
  PlugZap,

  // Goals & Focus
  Crosshair,
  Focus,
  Eye,
  Telescope,
  Flag,
  FlagTriangleRight,
  Milestone,

  // Misc Motivational
  Anchor,
  Bell,
  BellRing,
  Sunrise,
  Sunset,
  CloudMoon,
} from "lucide-react";

export const icons = [
  // Achievements
  { name: "trophy", Icon: Trophy },
  { name: "crown", Icon: Crown },
  { name: "medal", Icon: Medal },
  { name: "award", Icon: Award },
  { name: "star", Icon: Star },
  { name: "sparkles", Icon: Sparkles },
  { name: "sparkle", Icon: Sparkle },
  { name: "gem", Icon: Gem },
  { name: "diamond", Icon: Diamond },
  { name: "badge-check", Icon: BadgeCheck },
  { name: "check-circle", Icon: CheckCircle },
  { name: "check-circle-2", Icon: CheckCircle2 },
  { name: "thumbs-up", Icon: ThumbsUp },

  // Fitness
  { name: "dumbbell", Icon: Dumbbell },
  { name: "activity", Icon: Activity },
  { name: "bike", Icon: Bike },
  { name: "footprints", Icon: Footprints },
  { name: "mountain", Icon: Mountain },
  { name: "heart", Icon: Heart },
  { name: "flame", Icon: Flame },
  { name: "timer", Icon: Timer },
  { name: "apple", Icon: Apple },
  { name: "droplet", Icon: Droplet },
  { name: "beef", Icon: Beef },
  { name: "salad", Icon: Salad },

  // Mind & Learning
  { name: "brain", Icon: Brain },
  { name: "book", Icon: Book },
  { name: "book-open", Icon: BookOpen },
  { name: "graduation-cap", Icon: GraduationCap },
  { name: "lightbulb", Icon: Lightbulb },
  { name: "puzzle", Icon: Puzzle },
  { name: "pen", Icon: Pen },
  { name: "pencil", Icon: Pencil },
  { name: "notebook", Icon: Notebook },
  { name: "library", Icon: Library },
  { name: "microscope", Icon: Microscope },
  { name: "atom", Icon: Atom },

  // Growth & Progress
  { name: "trending-up", Icon: TrendingUp },
  { name: "trending-down", Icon: TrendingDown },
  { name: "line-chart", Icon: LineChart },
  { name: "bar-chart", Icon: BarChart },
  { name: "bar-chart-3", Icon: BarChart3 },
  { name: "arrow-up", Icon: ArrowUp },
  { name: "arrow-up-right", Icon: ArrowUpRight },
  { name: "arrow-right", Icon: ArrowRight },
  { name: "rocket", Icon: Rocket },
  { name: "sprout", Icon: Sprout },
  { name: "tree-pine", Icon: TreePine },

  // Mindfulness & Wellness
  { name: "leaf", Icon: Leaf },
  { name: "flower", Icon: Flower },
  { name: "flower-2", Icon: Flower2 },
  { name: "feather", Icon: Feather },
  { name: "waves", Icon: Waves },
  { name: "wind", Icon: Wind },
  { name: "cloud", Icon: Cloud },
  { name: "smile", Icon: Smile },
  { name: "laugh", Icon: Laugh },
  { name: "meh", Icon: Meh },
  { name: "frown", Icon: Frown },

  // Wealth & Career
  { name: "dollar-sign", Icon: DollarSign },
  { name: "coins", Icon: Coins },
  { name: "piggy-bank", Icon: PiggyBank },
  { name: "wallet", Icon: Wallet },
  { name: "briefcase", Icon: Briefcase },
  { name: "building", Icon: Building },
  { name: "key", Icon: Key },

  // Social & Relationships
  { name: "users", Icon: Users },
  { name: "user-check", Icon: UserCheck },
  { name: "user-plus", Icon: UserPlus },
  { name: "handshake", Icon: Handshake },
  { name: "heart-handshake", Icon: HeartHandshake },
  { name: "message-circle", Icon: MessageCircle },
  { name: "message-square", Icon: MessageSquare },
  { name: "send", Icon: Send },
  { name: "gift", Icon: Gift },
  { name: "party-popper", Icon: PartyPopper },

  // Travel & Adventure
  { name: "map", Icon: Map },
  { name: "map-pin", Icon: MapPin },
  { name: "compass", Icon: Compass },
  { name: "globe", Icon: Globe },
  { name: "plane", Icon: Plane },
  { name: "car", Icon: Car },
  { name: "ship", Icon: Ship },
  { name: "train", Icon: Train },
  { name: "tent", Icon: Tent },
  { name: "backpack", Icon: Backpack },
  { name: "luggage", Icon: Luggage },

  // Creativity & Hobbies
  { name: "palette", Icon: Palette },
  { name: "music", Icon: Music },
  { name: "music-2", Icon: Music2 },
  { name: "guitar", Icon: Guitar },
  { name: "camera", Icon: Camera },
  { name: "video", Icon: Video },
  { name: "mic", Icon: Mic },
  { name: "paintbrush", Icon: Paintbrush },
  { name: "scissors", Icon: Scissors },
  { name: "hammer", Icon: Hammer },
  { name: "wrench", Icon: Wrench },

  // Nature & Outdoors
  { name: "sun", Icon: Sun },
  { name: "sunrise", Icon: Sunrise },
  { name: "sunset", Icon: Sunset },
  { name: "moon", Icon: Moon },
  { name: "cloud-moon", Icon: CloudMoon },
  { name: "cloud-rain", Icon: CloudRain },
  { name: "snowflake", Icon: Snowflake },
  { name: "trees", Icon: Trees },
  { name: "tree-deciduous", Icon: TreeDeciduous },
  { name: "bird", Icon: Bird },
  { name: "fish", Icon: Fish },
  { name: "bug", Icon: Bug },
  { name: "paw-print", Icon: PawPrint },

  // Time & Consistency
  { name: "calendar", Icon: Calendar },
  { name: "calendar-check", Icon: CalendarCheck },
  { name: "calendar-days", Icon: CalendarDays },
  { name: "clock", Icon: Clock },
  { name: "hourglass", Icon: Hourglass },
  { name: "watch", Icon: Watch },
  { name: "alarm-clock", Icon: AlarmClock },
  { name: "repeat", Icon: Repeat },
  { name: "refresh-cw", Icon: RefreshCw },
  { name: "rotate-cw", Icon: RotateCw },

  // Energy & Power
  { name: "zap", Icon: Zap },
  { name: "bolt", Icon: Bolt },
  { name: "battery", Icon: Battery },
  { name: "battery-full", Icon: BatteryFull },
  { name: "battery-charging", Icon: BatteryCharging },
  { name: "power", Icon: Power },
  { name: "plug", Icon: Plug },
  { name: "plug-zap", Icon: PlugZap },

  // Goals & Focus
  { name: "target", Icon: Target },
  { name: "crosshair", Icon: Crosshair },
  { name: "focus", Icon: Focus },
  { name: "eye", Icon: Eye },
  { name: "telescope", Icon: Telescope },
  { name: "flag", Icon: Flag },
  { name: "flag-triangle-right", Icon: FlagTriangleRight },
  { name: "milestone", Icon: Milestone },

  // Misc Motivational
  { name: "shield", Icon: Shield },
  { name: "anchor", Icon: Anchor },
  { name: "bell", Icon: Bell },
  { name: "bell-ring", Icon: BellRing },
];

// ---------------------------------------------------------------------------
// Grouped by section — great for a sectioned icon picker UI
// ---------------------------------------------------------------------------
export const iconSections = [
  {
    label: "Achievements & Rewards",
    icons: [
      { name: "trophy", Icon: Trophy },
      { name: "crown", Icon: Crown },
      { name: "medal", Icon: Medal },
      { name: "award", Icon: Award },
      { name: "star", Icon: Star },
      { name: "sparkles", Icon: Sparkles },
      { name: "sparkle", Icon: Sparkle },
      { name: "gem", Icon: Gem },
      { name: "diamond", Icon: Diamond },
      { name: "badge-check", Icon: BadgeCheck },
      { name: "check-circle", Icon: CheckCircle },
      { name: "check-circle-2", Icon: CheckCircle2 },
      { name: "thumbs-up", Icon: ThumbsUp },
    ],
  },
  {
    label: "Fitness & Health",
    icons: [
      { name: "dumbbell", Icon: Dumbbell },
      { name: "activity", Icon: Activity },
      { name: "bike", Icon: Bike },
      { name: "footprints", Icon: Footprints },
      { name: "mountain", Icon: Mountain },
      { name: "heart", Icon: Heart },
      { name: "flame", Icon: Flame },
      { name: "timer", Icon: Timer },
      { name: "apple", Icon: Apple },
      { name: "droplet", Icon: Droplet },
      { name: "beef", Icon: Beef },
      { name: "salad", Icon: Salad },
    ],
  },
  {
    label: "Mind & Learning",
    icons: [
      { name: "brain", Icon: Brain },
      { name: "book", Icon: Book },
      { name: "book-open", Icon: BookOpen },
      { name: "graduation-cap", Icon: GraduationCap },
      { name: "lightbulb", Icon: Lightbulb },
      { name: "puzzle", Icon: Puzzle },
      { name: "pen", Icon: Pen },
      { name: "pencil", Icon: Pencil },
      { name: "notebook", Icon: Notebook },
      { name: "library", Icon: Library },
      { name: "microscope", Icon: Microscope },
      { name: "atom", Icon: Atom },
    ],
  },
  {
    label: "Growth & Progress",
    icons: [
      { name: "trending-up", Icon: TrendingUp },
      { name: "trending-down", Icon: TrendingDown },
      { name: "line-chart", Icon: LineChart },
      { name: "bar-chart", Icon: BarChart },
      { name: "bar-chart-3", Icon: BarChart3 },
      { name: "arrow-up", Icon: ArrowUp },
      { name: "arrow-up-right", Icon: ArrowUpRight },
      { name: "arrow-right", Icon: ArrowRight },
      { name: "rocket", Icon: Rocket },
      { name: "sprout", Icon: Sprout },
      { name: "tree-pine", Icon: TreePine },
    ],
  },
  {
    label: "Mindfulness & Wellness",
    icons: [
      { name: "leaf", Icon: Leaf },
      { name: "flower", Icon: Flower },
      { name: "flower-2", Icon: Flower2 },
      { name: "feather", Icon: Feather },
      { name: "waves", Icon: Waves },
      { name: "wind", Icon: Wind },
      { name: "cloud", Icon: Cloud },
      { name: "smile", Icon: Smile },
      { name: "laugh", Icon: Laugh },
      { name: "meh", Icon: Meh },
      { name: "frown", Icon: Frown },
    ],
  },
  {
    label: "Wealth & Career",
    icons: [
      { name: "dollar-sign", Icon: DollarSign },
      { name: "coins", Icon: Coins },
      { name: "piggy-bank", Icon: PiggyBank },
      { name: "wallet", Icon: Wallet },
      { name: "briefcase", Icon: Briefcase },
      { name: "building", Icon: Building },
      { name: "key", Icon: Key },
    ],
  },
  {
    label: "Social & Relationships",
    icons: [
      { name: "users", Icon: Users },
      { name: "user-check", Icon: UserCheck },
      { name: "user-plus", Icon: UserPlus },
      { name: "handshake", Icon: Handshake },
      { name: "heart-handshake", Icon: HeartHandshake },
      { name: "message-circle", Icon: MessageCircle },
      { name: "message-square", Icon: MessageSquare },
      { name: "send", Icon: Send },
      { name: "gift", Icon: Gift },
      { name: "party-popper", Icon: PartyPopper },
    ],
  },
  {
    label: "Travel & Adventure",
    icons: [
      { name: "map", Icon: Map },
      { name: "map-pin", Icon: MapPin },
      { name: "compass", Icon: Compass },
      { name: "globe", Icon: Globe },
      { name: "plane", Icon: Plane },
      { name: "car", Icon: Car },
      { name: "ship", Icon: Ship },
      { name: "train", Icon: Train },
      { name: "tent", Icon: Tent },
      { name: "backpack", Icon: Backpack },
      { name: "luggage", Icon: Luggage },
    ],
  },
  {
    label: "Creativity & Hobbies",
    icons: [
      { name: "palette", Icon: Palette },
      { name: "music", Icon: Music },
      { name: "music-2", Icon: Music2 },
      { name: "guitar", Icon: Guitar },
      { name: "camera", Icon: Camera },
      { name: "video", Icon: Video },
      { name: "mic", Icon: Mic },
      { name: "paintbrush", Icon: Paintbrush },
      { name: "scissors", Icon: Scissors },
      { name: "hammer", Icon: Hammer },
      { name: "wrench", Icon: Wrench },
    ],
  },
  {
    label: "Nature & Outdoors",
    icons: [
      { name: "sun", Icon: Sun },
      { name: "sunrise", Icon: Sunrise },
      { name: "sunset", Icon: Sunset },
      { name: "moon", Icon: Moon },
      { name: "cloud-moon", Icon: CloudMoon },
      { name: "cloud-rain", Icon: CloudRain },
      { name: "snowflake", Icon: Snowflake },
      { name: "trees", Icon: Trees },
      { name: "tree-deciduous", Icon: TreeDeciduous },
      { name: "bird", Icon: Bird },
      { name: "fish", Icon: Fish },
      { name: "bug", Icon: Bug },
      { name: "paw-print", Icon: PawPrint },
    ],
  },
  {
    label: "Time & Consistency",
    icons: [
      { name: "calendar", Icon: Calendar },
      { name: "calendar-check", Icon: CalendarCheck },
      { name: "calendar-days", Icon: CalendarDays },
      { name: "clock", Icon: Clock },
      { name: "hourglass", Icon: Hourglass },
      { name: "watch", Icon: Watch },
      { name: "alarm-clock", Icon: AlarmClock },
      { name: "repeat", Icon: Repeat },
      { name: "refresh-cw", Icon: RefreshCw },
      { name: "rotate-cw", Icon: RotateCw },
    ],
  },
  {
    label: "Energy & Power",
    icons: [
      { name: "zap", Icon: Zap },
      { name: "bolt", Icon: Bolt },
      { name: "battery", Icon: Battery },
      { name: "battery-full", Icon: BatteryFull },
      { name: "battery-charging", Icon: BatteryCharging },
      { name: "power", Icon: Power },
      { name: "plug", Icon: Plug },
      { name: "plug-zap", Icon: PlugZap },
    ],
  },
  {
    label: "Goals & Focus",
    icons: [
      { name: "target", Icon: Target },
      { name: "crosshair", Icon: Crosshair },
      { name: "focus", Icon: Focus },
      { name: "eye", Icon: Eye },
      { name: "telescope", Icon: Telescope },
      { name: "flag", Icon: Flag },
      { name: "flag-triangle-right", Icon: FlagTriangleRight },
      { name: "milestone", Icon: Milestone },
    ],
  },
  {
    label: "Discipline & Protection",
    icons: [
      { name: "shield", Icon: Shield },
      { name: "anchor", Icon: Anchor },
      { name: "bell", Icon: Bell },
      { name: "bell-ring", Icon: BellRing },
    ],
  },
];

export const emojiSections = [
  {
    label: "Achievements & Rewards",
    emojis: [
      { name: "trophy", emoji: "🏆" },
      { name: "gold-medal", emoji: "🥇" },
      { name: "silver-medal", emoji: "🥈" },
      { name: "bronze-medal", emoji: "🥉" },
      { name: "military-medal", emoji: "🎖️" },
      { name: "sports-medal", emoji: "🏅" },
      { name: "crown", emoji: "👑" },
      { name: "gem-stone", emoji: "💎" },
      { name: "star", emoji: "⭐" },
      { name: "glowing-star", emoji: "🌟" },
      { name: "sparkles", emoji: "✨" },
      { name: "dizzy", emoji: "💫" },
      { name: "party-popper", emoji: "🎉" },
      { name: "confetti-ball", emoji: "🎊" },
      { name: "raising-hands", emoji: "🙌" },
      { name: "clapping-hands", emoji: "👏" },
      { name: "star-struck", emoji: "🤩" },
    ],
  },
  {
    label: "Fitness & Health",
    emojis: [
      { name: "flexed-biceps", emoji: "💪" },
      { name: "weight-lifter", emoji: "🏋️" },
      { name: "cartwheel", emoji: "🤸" },
      { name: "runner", emoji: "🏃" },
      { name: "cyclist", emoji: "🚴" },
      { name: "meditation", emoji: "🧘" },
      { name: "handball", emoji: "🤾" },
      { name: "basketball", emoji: "⛹️" },
      { name: "swimmer", emoji: "🏊" },
      { name: "boxing-glove", emoji: "🥊" },
      { name: "leg", emoji: "🦵" },
      { name: "anatomical-heart", emoji: "🫀" },
      { name: "red-heart", emoji: "❤️" },
      { name: "heart-on-fire", emoji: "❤️‍🔥" },
      { name: "beating-heart", emoji: "💓" },
      { name: "green-salad", emoji: "🥗" },
      { name: "red-apple", emoji: "🍎" },
      { name: "avocado", emoji: "🥑" },
      { name: "droplet", emoji: "💧" },
      { name: "broccoli", emoji: "🥦" },
      { name: "tea", emoji: "🍵" },
      { name: "cup-with-straw", emoji: "🥤" },
      { name: "sleeping-face", emoji: "😴" },
      { name: "bed", emoji: "🛌" },
      { name: "stethoscope", emoji: "🩺" },
    ],
  },
  {
    label: "Mind & Learning",
    emojis: [
      { name: "brain", emoji: "🧠" },
      { name: "books", emoji: "📚" },
      { name: "open-book", emoji: "📖" },
      { name: "red-book", emoji: "📕" },
      { name: "green-book", emoji: "📗" },
      { name: "blue-book", emoji: "📘" },
      { name: "orange-book", emoji: "📙" },
      { name: "pencil", emoji: "✏️" },
      { name: "pen", emoji: "🖊️" },
      { name: "fountain-pen", emoji: "🖋️" },
      { name: "memo", emoji: "📝" },
      { name: "graduation-cap", emoji: "🎓" },
      { name: "school", emoji: "🏫" },
      { name: "microscope", emoji: "🔬" },
      { name: "telescope", emoji: "🔭" },
      { name: "light-bulb", emoji: "💡" },
      { name: "puzzle-piece", emoji: "🧩" },
      { name: "old-key", emoji: "🗝️" },
      { name: "key", emoji: "🔑" },
      { name: "bar-chart", emoji: "📊" },
      { name: "chart-increasing", emoji: "📈" },
      { name: "abacus", emoji: "🧮" },
    ],
  },
  {
    label: "Growth & Progress",
    emojis: [
      { name: "rocket", emoji: "🚀" },
      { name: "seedling", emoji: "🌱" },
      { name: "herb", emoji: "🌿" },
      { name: "deciduous-tree", emoji: "🌳" },
      { name: "evergreen-tree", emoji: "🌲" },
      { name: "tanabata-tree", emoji: "🎋" },
      { name: "chart-increasing", emoji: "📈" },
      { name: "up-arrow", emoji: "⬆️" },
      { name: "top-arrow", emoji: "🔝" },
      { name: "chart-increasing-yen", emoji: "💹" },
      { name: "potted-plant", emoji: "🪴" },
      { name: "sunflower", emoji: "🌻" },
      { name: "tulip", emoji: "🌷" },
      { name: "cherry-blossom", emoji: "🌸" },
      { name: "four-leaf-clover", emoji: "🍀" },
      { name: "butterfly", emoji: "🦋" },
    ],
  },
  {
    label: "Mindfulness & Wellness",
    emojis: [
      { name: "meditation", emoji: "🧘" },
      { name: "man-meditating", emoji: "🧘‍♂️" },
      { name: "woman-meditating", emoji: "🧘‍♀️" },
      { name: "candle", emoji: "🕯️" },
      { name: "lotus", emoji: "🪷" },
      { name: "peace-symbol", emoji: "☮️" },
      { name: "om", emoji: "🕉️" },
      { name: "massage", emoji: "💆" },
      { name: "woman-massage", emoji: "💆‍♀️" },
      { name: "cherry-blossom", emoji: "🌸" },
      { name: "leaf-flutter", emoji: "🍃" },
      { name: "water-wave", emoji: "🌊" },
      { name: "cloud", emoji: "☁️" },
      { name: "sun-behind-cloud", emoji: "🌤️" },
      { name: "crescent-moon", emoji: "🌙" },
      { name: "relieved-face", emoji: "😌" },
      { name: "smiling-face", emoji: "😊" },
      { name: "folded-hands", emoji: "🙏" },
      { name: "person-kneeling", emoji: "🧎" },
      { name: "bubbles", emoji: "🫧" },
    ],
  },
  {
    label: "Energy & Power",
    emojis: [
      { name: "high-voltage", emoji: "⚡" },
      { name: "fire", emoji: "🔥" },
      { name: "collision", emoji: "💥" },
      { name: "sparkles", emoji: "✨" },
      { name: "glowing-star", emoji: "🌟" },
      { name: "battery", emoji: "🔋" },
      { name: "dizzy", emoji: "💫" },
      { name: "comet", emoji: "☄️" },
      { name: "low-battery", emoji: "🪫" },
      { name: "electric-plug", emoji: "🔌" },
      { name: "light-bulb", emoji: "💡" },
      { name: "joystick", emoji: "🕹️" },
    ],
  },
  {
    label: "Goals & Focus",
    emojis: [
      { name: "bullseye", emoji: "🎯" },
      { name: "magnifying-glass", emoji: "🔎" },
      { name: "eye", emoji: "👁️" },
      { name: "world-map", emoji: "🗺️" },
      { name: "compass", emoji: "🧭" },
      { name: "triangular-flag", emoji: "🚩" },
      { name: "chequered-flag", emoji: "🏁" },
      { name: "round-pushpin", emoji: "📍" },
      { name: "pushpin", emoji: "📌" },
      { name: "signpost", emoji: "🪧" },
      { name: "flag-in-hole", emoji: "⛳" },
    ],
  },
  {
    label: "Time & Consistency",
    emojis: [
      { name: "alarm-clock", emoji: "⏰" },
      { name: "stopwatch", emoji: "⏱️" },
      { name: "timer-clock", emoji: "⏲️" },
      { name: "watch", emoji: "⌚" },
      { name: "one-oclock", emoji: "🕐" },
      { name: "mantelpiece-clock", emoji: "🕰️" },
      { name: "calendar", emoji: "📅" },
      { name: "tear-off-calendar", emoji: "📆" },
      { name: "spiral-calendar", emoji: "🗓️" },
      { name: "hourglass-done", emoji: "⏳" },
      { name: "hourglass-not-done", emoji: "⌛" },
      { name: "counterclockwise-arrows", emoji: "🔄" },
      { name: "repeat-button", emoji: "🔁" },
      { name: "infinity", emoji: "♾️" },
      { name: "clipboard", emoji: "📋" },
      { name: "check-mark-button", emoji: "✅" },
      { name: "check-box", emoji: "☑️" },
    ],
  },
  {
    label: "Wealth & Career",
    emojis: [
      { name: "money-bag", emoji: "💰" },
      { name: "dollar-banknote", emoji: "💵" },
      { name: "yen-banknote", emoji: "💴" },
      { name: "euro-banknote", emoji: "💶" },
      { name: "pound-banknote", emoji: "💷" },
      { name: "coin", emoji: "🪙" },
      { name: "credit-card", emoji: "💳" },
      { name: "bank", emoji: "🏦" },
      { name: "chart-increasing", emoji: "📈" },
      { name: "briefcase", emoji: "💼" },
      { name: "necktie", emoji: "👔" },
      { name: "office-building", emoji: "🏢" },
      { name: "classical-building", emoji: "🏛️" },
      { name: "hammer-and-wrench", emoji: "🛠️" },
      { name: "gear", emoji: "⚙️" },
    ],
  },
  {
    label: "Social & Relationships",
    emojis: [
      { name: "busts-in-silhouette", emoji: "👥" },
      { name: "handshake", emoji: "🤝" },
      { name: "people-hugging", emoji: "🫂" },
      { name: "speech-balloon", emoji: "💬" },
      { name: "speaking-head", emoji: "🗣️" },
      { name: "mending-heart", emoji: "❤️‍🩹" },
      { name: "two-hearts", emoji: "💕" },
      { name: "revolving-hearts", emoji: "💞" },
      { name: "wrapped-gift", emoji: "🎁" },
      { name: "balloon", emoji: "🎈" },
      { name: "family", emoji: "👨‍👩‍👧" },
      { name: "heart-hands", emoji: "🫶" },
    ],
  },
  {
    label: "Creativity & Hobbies",
    emojis: [
      { name: "artist-palette", emoji: "🎨" },
      { name: "paintbrush", emoji: "🖌️" },
      { name: "performing-arts", emoji: "🎭" },
      { name: "clapper-board", emoji: "🎬" },
      { name: "microphone", emoji: "🎤" },
      { name: "headphone", emoji: "🎧" },
      { name: "musical-note", emoji: "🎵" },
      { name: "musical-notes", emoji: "🎶" },
      { name: "guitar", emoji: "🎸" },
      { name: "musical-keyboard", emoji: "🎹" },
      { name: "drum", emoji: "🥁" },
      { name: "camera", emoji: "📷" },
      { name: "camera-with-flash", emoji: "📸" },
      { name: "video-game", emoji: "🎮" },
      { name: "joystick", emoji: "🕹️" },
      { name: "thread", emoji: "🧵" },
      { name: "sewing-needle", emoji: "🪡" },
      { name: "scissors", emoji: "✂️" },
      { name: "yarn", emoji: "🧶" },
    ],
  },
  {
    label: "Nature & Adventure",
    emojis: [
      { name: "sun", emoji: "🌞" },
      { name: "full-moon-face", emoji: "🌝" },
      { name: "new-moon-face", emoji: "🌚" },
      { name: "rainbow", emoji: "🌈" },
      { name: "snow-capped-mountain", emoji: "🏔️" },
      { name: "mountain", emoji: "⛰️" },
      { name: "camping", emoji: "🏕️" },
      { name: "national-park", emoji: "🏞️" },
      { name: "volcano", emoji: "🌋" },
      { name: "beach-with-umbrella", emoji: "🏖️" },
      { name: "sunrise", emoji: "🌅" },
      { name: "sunrise-over-mountains", emoji: "🌄" },
      { name: "mount-fuji", emoji: "🗻" },
      { name: "eagle", emoji: "🦅" },
      { name: "wolf", emoji: "🐺" },
      { name: "lion", emoji: "🦁" },
      { name: "tiger", emoji: "🐯" },
      { name: "owl", emoji: "🦉" },
    ],
  },
  {
    label: "Travel & Discovery",
    emojis: [
      { name: "airplane", emoji: "✈️" },
      { name: "automobile", emoji: "🚗" },
      { name: "sport-utility-vehicle", emoji: "🚙" },
      { name: "bus", emoji: "🚌" },
      { name: "locomotive", emoji: "🚂" },
      { name: "ship", emoji: "🚢" },
      { name: "sailboat", emoji: "⛵" },
      { name: "canoe", emoji: "🛶" },
      { name: "desert-island", emoji: "🏝️" },
      { name: "globe-europe-africa", emoji: "🌍" },
      { name: "globe-americas", emoji: "🌎" },
      { name: "globe-asia-australia", emoji: "🌏" },
      { name: "luggage", emoji: "🧳" },
      { name: "backpack", emoji: "🎒" },
      { name: "world-map", emoji: "🗺️" },
      { name: "compass", emoji: "🧭" },
    ],
  },
  {
    label: "Discipline & Strength",
    emojis: [
      { name: "shield", emoji: "🛡️" },
      { name: "crossed-swords", emoji: "⚔️" },
      { name: "dagger", emoji: "🗡️" },
      { name: "bow-and-arrow", emoji: "🏹" },
      { name: "martial-arts-uniform", emoji: "🥋" },
      { name: "dragon", emoji: "🐉" },
      { name: "mechanical-arm", emoji: "🦾" },
      { name: "chains", emoji: "⛓️" },
      { name: "brick", emoji: "🧱" },
      { name: "rock", emoji: "🪨" },
      { name: "lion", emoji: "🦁" },
      { name: "tiger", emoji: "🐅" },
      { name: "shark", emoji: "🦈" },
    ],
  },
];

export const emojiMap = Object.fromEntries(
  emojiSections.flatMap((section) =>
    section.emojis.map(({ name, emoji }) => [name, emoji])
  )
);
export const iconMap = Object.fromEntries(
  iconSections.flatMap((section) =>
    section.icons.map(({ name, Icon }) => [name, Icon])
  )
);

/* ============================================================
   🎨 CENTRAL THEME — change colors here
============================================================ */
const theme = {
  backdrop: "bg-black/70 backdrop-blur-sm",

  // 🆕 Gradient border system
  borderGradient: "bg-gradient-to-b from-white via-zinc-400 to-zinc-700",
  borderGradientThin: "bg-gradient-to-b from-white via-zinc-500 to-zinc-800",
  borderWidth: "p-[2px]",
  borderWidthThin: "p-[1.5px]",
  borderRadius: "rounded-3xl",
  innerRadius: "rounded-[calc(1.5rem-2px)]",
  rowRadius: "rounded-2xl",
  rowInnerRadius: "rounded-[calc(1rem-1.5px)]",

  // Surfaces (dark inside the gradient border)
  surfaceSolid: "bg-zinc-950",
  surfaceSoft: "bg-zinc-900/70",

  // Gradient text
  gradientText:
    "bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent",
  gradientTextMuted:
    "bg-gradient-to-b from-zinc-200 to-zinc-500 bg-clip-text text-transparent",

  // Buttons
  primaryBtn:
    "bg-gradient-to-b from-white to-zinc-300 text-zinc-900 hover:from-white hover:to-white",
  ghostBtn:
    "border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white",
  accentBtn: "border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10",

  // Inputs
  input:
    "bg-zinc-900/70 border border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500/50",

  // Divider
  divider: "border-zinc-800",

  // Status
  success: "text-emerald-400",
  error: "text-red-400",
  muted: "text-zinc-500",

  modalMaxWidth: "max-w-lg",
};

interface ActivityTasksProps {
  activityId: string;
}

type LeaderboardType = "daily" | "task" | "activity";
type PanelType = "analytics" | "history" | "achievements" | "createAchievement";

export default function ActivityTasks({ activityId,ismember }: {activityId:string,ismember:any}) {
  const { data: activity, isLoading, isError, error } = useActivity(activityId);
  const { data: user, isLoading: userLoading, isError: userError } = useCurrentUser()
  //const { data: isCompleted, isLoading: isCompletedLoading } = useTaskCompleted(activityId);
  const createProgress = useCreateProgress();

  const [values, setValues] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});

  const [successTaskId, setSuccessTaskId] = useState<string | null>(null);
  const [errorTaskId, setErrorTaskId] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const [achievement, setAchievement] = useState<any | null>(null);

  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [leaderboardType, setLeaderboardType] =
    useState<LeaderboardType>("daily");
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  const [panelOpen, setPanelOpen] = useState(false);
  const [panelType, setPanelType] = useState<PanelType>("analytics");

  if (isLoading) {
    return <div className={`p-4 ${theme.muted}`}>Loading tasks...</div>;
  }

  if(userLoading){
    return <div className={`p-4 ${theme.muted}`}>Loading user...</div>;
  }

  //const member = members?.find((member) => member.userId === user?.id); //////////////////////////////////////////

  if (isError) {
    return (
      <div className={`p-4 ${theme.error}`}>
        Failed to load tasks: {error.message}
      </div>
    );
  }

  if (!activity) {
    return <div className="p-4 text-white">Activity not found</div>;
  }

  const tasks = activity.task ?? [];

  console.log("ACTIVITY TASKS", tasks);
  console.log("tasktype", tasks[0].taskType)

const handleSubmitValue = (taskId: string, value: number) => {
  if (!value || value <= 0) return;

  setErrorTaskId(null);
  setSuccessTaskId(null);
  setPendingId(taskId);

  createProgress.mutate(
    {
      completedValue: value,
      activityId,
      taskId,
      note: notes[taskId] || undefined,
    },
    {
      onSuccess: (data: any) => {
        setSuccessTaskId(taskId);
        setPendingId(null);
        if (data.achieved?.length > 0) {
          setAchievement(data.achieved[0]);
        }
      },
      onError: () => {
        setErrorTaskId(taskId);
        setPendingId(null);
      },
    }
  );
};

console.log("THIS IS THE ACHIEVEMENT type",achievement)
// console.log("THIS IS THE ACHIEVEMENT value",achievement.iconValue)

// VALUE branch uses this — pulls the number from `values`
const handleSubmit = (taskId: string) => {
  handleSubmitValue(taskId, Number(values[taskId]));
};

  const openTaskLeaderboard = (task: any, type: "daily" | "task") => {
    setSelectedTask(task);
    setLeaderboardType(type);
    setLeaderboardOpen(true);
  };

  const openActivityLeaderboard = () => {
    setSelectedTask(null);
    setLeaderboardType("activity");
    setLeaderboardOpen(true);
  };

  const closeLeaderboard = () => {
    setLeaderboardOpen(false);
    setSelectedTask(null);
  };

  const openPanel = (type: PanelType, task?: any) => {
    if (task) setSelectedTask(task);
    setPanelType(type);
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
    setSelectedTask(null);
  };

  return (
    <>
      <div className="w-full p-4 text-white">
        {/* ==================== HEADER ==================== */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className={`text-2xl font-semibold ${theme.gradientText}`}>
            All tasks
          </h1>

          {ismember && (
            <button
              type="button"
              onClick={openActivityLeaderboard}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${theme.accentBtn}`}
            >
              Activity leaderboard
            </button>
          )}
        </div>

        {/* ==================== TASK LIST ==================== */}
        {tasks.length === 0 ? (
          <p className={theme.muted}>No tasks available.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {tasks.map((task: any) => (
              <div
                key={task.id}
                className={`${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient} shadow-xl transition-shadow hover:shadow-2xl`}
              >
                <div
                  className={`p-6 ${theme.surfaceSolid} ${theme.innerRadius}`}
                >
                  {/* ==================== TASK HEADER ==================== */}
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h2
                        className={`truncate text-xl font-semibold ${theme.gradientText}`}
                      >
                        {task.name}
                      </h2>

                      {task.description && (
                        <p
                          className={`mt-1 text-sm leading-relaxed ${theme.muted}`}
                        >
                          {task.description}
                        </p>
                      )}
                    </div>

                    <span
                      className={`flex-shrink-0 rounded-full border border-zinc-700 bg-zinc-900/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-300`}
                    >
                      {task.scheduleType}
                    </span>
                  </div>

                  {/* ==================== STAT PILLS ==================== */}
                  <div className="mb-5 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-zinc-300">
                      <span className="text-zinc-500">🎯 Target</span>
                      <span className="font-semibold text-white">
                        {task.targetValue} {task.unit}
                      </span>
                    </span>

                    {task.schedules?.length > 0 && (
                      <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-zinc-300">
                        <span className="text-zinc-500">📅 Days</span>
                        <span className="font-semibold text-white">
                          {task.schedules.map((s: any) => s.day).join(", ")}
                        </span>
                      </span>
                    )}
                  </div>

                  {/* ==================== PROGRESS FORM ==================== */}
                  {ismember && task.taskType?.toUpperCase() === "CHECKLIST" ? (
                    /* ---------- CHECKLIST UI ---------- */
                    <div className="mb-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
                      {task.isCompleted ? (
                        <>
                          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                            Completed
                          </p>
                          <label className="flex cursor-not-allowed items-center gap-3 opacity-70">
                            <input
                              type="checkbox"
                              checked={true}
                              disabled
                              readOnly
                              className="h-5 w-5 accent-emerald-500"
                            />
                            <span className="text-sm text-emerald-400">
                              ✓ Completed this task
                            </span>
                          </label>
                        </>
                      ) : (
                        <>
                          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                            Mark as done
                          </p>

                          <label className="flex cursor-pointer items-center gap-3">
                            <input
                              type="checkbox"
                              checked={checkedTasks[task.id] ?? false}
                              disabled={pendingId === task.id}
                              onChange={(e) => {
                                const next = e.target.checked;
                                setCheckedTasks((prev) => ({
                                  ...prev,
                                  [task.id]: next,
                                }));
                                if (next) handleSubmitValue(task.id, 1);
                              }}
                              className="h-5 w-5 accent-emerald-500"
                            />
                            <span className="text-sm text-zinc-300">
                              {pendingId === task.id
                                ? "Submitting..."
                                : "Complete this task?"}
                            </span>
                          </label>

                          {successTaskId === task.id && (
                            <p
                              className={`mt-3 flex items-center gap-1.5 text-sm ${theme.success}`}
                            >
                              <span>✓</span> Progress submitted successfully.
                            </p>
                          )}
                          {errorTaskId === task.id && (
                            <p
                              className={`mt-3 flex items-center gap-1.5 text-sm ${theme.error}`}
                            >
                              <span>✕</span> Failed to submit progress.
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  ) : (
                    ismember && (
                      <div className="mb-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                          {task.isCompleted
                            ? "Completed — Log more progress"
                            : "Log progress"}
                        </p>

                        {/* Completed badge */}
                        {task.isCompleted ? (
                          <p className="mb-3 flex items-center gap-1.5 text-sm text-emerald-400">
                            <span>✓</span> Completed: {task.completedValue}{" "}
                            {task.unit}
                          </p>
                        ) : (
                          <p className="mb-3 flex items-center gap-1.5 text-sm text-gray-400">
                            Completed: {task.completedValue} {task.unit}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-2">
                          <input
                            type="number"
                            min="1"
                            placeholder={`Enter ${task.unit}`}
                            value={values[task.id] ?? ""}
                            onChange={(e) =>
                              setValues((prev) => ({
                                ...prev,
                                [task.id]: e.target.value,
                              }))
                            }
                            className={`w-32 rounded-xl px-3 py-2.5 text-sm outline-none transition ${theme.input}`}
                          />

                          <input
                            type="text"
                            placeholder="Optional note"
                            value={notes[task.id] ?? ""}
                            onChange={(e) =>
                              setNotes((prev) => ({
                                ...prev,
                                [task.id]: e.target.value,
                              }))
                            }
                            className={`min-w-[160px] flex-1 rounded-xl px-3 py-2.5 text-sm outline-none transition ${theme.input}`}
                          />

                          <button
                            type="button"
                            onClick={() => handleSubmit(task.id)}
                            disabled={pendingId === task.id}
                            className={`rounded-xl px-5 py-2.5 text-sm font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 ${theme.primaryBtn}`}
                          >
                            {pendingId === task.id ? "Submitting..." : "Submit"}
                          </button>
                        </div>

                        {/* Inline status */}
                        {successTaskId === task.id && (
                          <p
                            className={`mt-3 flex items-center gap-1.5 text-sm ${theme.success}`}
                          >
                            <span>✓</span> Progress submitted successfully.
                          </p>
                        )}
                        {errorTaskId === task.id && (
                          <p
                            className={`mt-3 flex items-center gap-1.5 text-sm ${theme.error}`}
                          >
                            <span>✕</span> Failed to submit progress.
                          </p>
                        )}
                      </div>
                    )
                  )}

                  {/* ==================== ACTION BAR ==================== */}
                  {ismember && (
                    <div
                      className={`flex flex-wrap gap-2 border-t pt-4 ${theme.divider}`}
                    >
                      <button
                        type="button"
                        onClick={() => openTaskLeaderboard(task, "daily")}
                        className={`rounded-xl px-3.5 py-2 text-xs font-medium transition ${theme.ghostBtn}`}
                      >
                        🏆 Today
                      </button>

                      <button
                        type="button"
                        onClick={() => openTaskLeaderboard(task, "task")}
                        className={`rounded-xl px-3.5 py-2 text-xs font-medium transition ${theme.ghostBtn}`}
                      >
                        🏆 All time
                      </button>

                      <button
                        type="button"
                        onClick={() => openPanel("history", task)}
                        className={`rounded-xl px-3.5 py-2 text-xs font-medium transition ${theme.ghostBtn}`}
                      >
                        📊 History
                      </button>

                      <button
                        type="button"
                        onClick={() => openPanel("achievements", task)}
                        className={`rounded-xl px-3.5 py-2 text-xs font-medium transition ${theme.ghostBtn}`}
                      >
                        🎖 Achievements
                      </button>

                      {activity?.creator.id === user?.id && (
                        <button
                          type="button"
                          onClick={() => openPanel("createAchievement", task)}
                          className={`ml-auto rounded-xl px-3.5 py-2 text-xs font-semibold transition ${theme.accentBtn}`}
                        >
                          + New achievement
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ==================== ANALYTICS TRIGGER ==================== */}
        {ismember && (
          <button
            type="button"
            onClick={() => openPanel("analytics")}
            className={`mt-6 w-full rounded-2xl px-4 py-3 text-sm font-semibold transition ${theme.accentBtn}`}
          >
            View Daily Progress Analytics
          </button>
        )}

        {achievement && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="w-[90%] max-w-md rounded-3xl border border-yellow-500/30 bg-zinc-900 p-8 text-center shadow-2xl">
              <div className="mb-4 text-6xl">
                {achievement.iconType === "EMOJI"
                  ? emojiMap[achievement.iconValue]
                  : achievement.iconType === "PREBUILT"
                  ?(
  (() => {
    const Icon = iconMap[achievement.iconValue];

    return Icon ? <Icon size={24} /> : "🏆";
  })()
) : (
  "🏆")}
              </div>

              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-yellow-400">
                Achievement Unlocked!
              </p>

              <h2 className="mb-3 text-3xl font-bold text-white">
                {achievement.totalValue} {achievement.unit}
              </h2>

              <p className="mb-6 text-zinc-400">You reached a new milestone!</p>

              <button
                type="button"
                onClick={() => setAchievement(null)}
                className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
              >
                Awesome!
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Leaderboard Modal */}
      {leaderboardOpen && (
        <LeaderboardModal
          type={leaderboardType}
          activityId={activityId}
          task={selectedTask}
          onClose={closeLeaderboard}
          member={ismember}
        />
      )}

      {/* Panel Modal (4 components) */}
      {panelOpen && (
        <PanelModal
          type={panelType}
          activityId={activityId}
          task={selectedTask}
          onClose={closePanel}
        />
      )}
    </>
  );
}

/* ============================================================
   🧩 PANEL MODAL — wraps the 4 components
============================================================ */
interface PanelModalProps {
  type: PanelType;
  activityId: string;
  task: any | null;
  onClose: () => void;
}

function PanelModal({ type, activityId, task, onClose }: PanelModalProps) {
  const titles: Record<PanelType, string> = {
    analytics: "Daily Progress Analytics",
    history: "Progress History",
    achievements: "Achievements",
    createAchievement: "Create Achievement",
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${theme.backdrop}`}
      onClick={onClose}
    >
      {/* 🆕 Gradient border wrapper */}
      <div
        className={`w-full max-w-5xl ${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient} shadow-2xl`}
      >
        <div
          className={`max-h-[85vh] overflow-y-auto p-5 ${theme.surfaceSolid} ${theme.innerRadius}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`mb-5 flex items-center justify-between border-b pb-3 ${theme.divider}`}
          >
            <h2 className={`text-xl font-semibold ${theme.gradientText}`}>
              {titles[type]}
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-3 py-1 text-xl text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            >
              ×
            </button>
          </div>

          {type === "analytics" && (
            <DailyProgressAnalytics activityId={activityId} />
          )}
          {type === "history" && task && (
            <TaskProgressHistory taskId={task.id} />
          )}
          {type === "achievements" && task && (
            <TaskAchievements taskId={task.id} />
          )}
          {type === "createAchievement" && task && (
            <CreateTaskAchievement taskId={task.id} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   LEADERBOARD MODAL
============================================================ */
interface LeaderboardModalProps {
  type: LeaderboardType;
  activityId: string;
  task: any | null;
  onClose: () => void;
  member:boolean
}

function LeaderboardModal({
  type,
  activityId,
  task,
  onClose,
  member
}: LeaderboardModalProps) {
  const title =
    type === "daily"
      ? `${task?.name ?? "Task"} - Today`
      : type === "task"
      ? `${task?.name ?? "Task"} - Lifetime`
      : "Activity leaderboard";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${theme.backdrop}`}
      onClick={onClose}
    >
      {/* 🆕 Gradient border wrapper */}
      <div
        className={`w-full ${theme.modalMaxWidth} ${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient} shadow-2xl`}
      >
        <div
          className={`max-h-[80vh] overflow-y-auto p-5 ${theme.surfaceSolid} ${theme.innerRadius}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`mb-5 flex items-center justify-between border-b pb-3 ${theme.divider}`}
          >
            <div>
              <h2 className={`text-xl font-semibold ${theme.gradientText}`}>
                {title}
              </h2>

              {type === "daily" && (
                <p className={`text-sm ${theme.muted}`}>
                  Today&apos;s progress
                </p>
              )}
              {type === "task" && (
                <p className={`text-sm ${theme.muted}`}>
                  Total accumulated progress
                </p>
              )}
              {member && type === "activity" && (
                <p className={`text-sm ${theme.muted}`}>
                  Total Task completion
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-3 py-1 text-xl text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            >
              ×
            </button>
          </div>

          {type === "daily" && task && (
            <DailyLeaderboard taskId={task.id} unit={task.unit} />
          )}
          {type === "task" && task && (
            <TaskLeaderboard taskId={task.id} unit={task.unit} />
          )}
          {type === "activity" && (
            <ActivityLeaderboard activityId={activityId} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   🏆 LEADERBOARD ROW — shared gradient-bordered row
============================================================ */
function LeaderboardRow({
  index,
  children,
  right,
  isYou = false,
}: {
  index: number;
  children: React.ReactNode;
  right: React.ReactNode;
  isYou?: boolean;
}) {
  return (
    <div
      className={`${theme.borderWidthThin} ${theme.rowRadius} ${
        isYou
          ? "bg-gradient-to-b from-blue-300 via-blue-500 to-blue-800"
          : theme.borderGradientThin
      }`}
    >
      <div
        className={`flex items-center justify-between p-3 ${
          isYou ? "bg-zinc-900" : theme.surfaceSolid
        } ${theme.rowInnerRadius}`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`w-7 text-center font-semibold ${theme.gradientTextMuted}`}
          >
            {index + 1}
          </span>
          {children}
        </div>
        {right}
      </div>
    </div>
  );
}

/* ============================================================
   DAILY LEADERBOARD
============================================================ */
interface DailyLeaderboardProps {
  taskId: string;
  unit: string;
}

function DailyLeaderboard({ taskId, unit }: DailyLeaderboardProps) {
  const { data: leadership, isLoading, isError } = useDailyLeadership(taskId);

  if (isLoading)
    return (
      <p className={`py-8 text-center ${theme.muted}`}>
        Loading leaderboard...
      </p>
    );
  if (isError)
    return (
      <p className={`py-8 text-center ${theme.error}`}>
        Failed to load leaderboard.
      </p>
    );
  if (!leadership || leadership.length === 0)
    return (
      <p className={`py-8 text-center ${theme.muted}`}>
        No progress recorded today.
      </p>
    );

  return (
    <div className="flex flex-col gap-3">
      {leadership.map((entry: any, index: any) => (
        <LeaderboardRow
          key={entry.userId}
          index={index}
          right={
            <span className="font-semibold text-white">
              {Number(entry.completedValue)} {unit}
            </span>
          }
        >
          <div>
            <p className="font-medium text-white">{entry.user.username}</p>
            <p className={`text-xs ${theme.muted}`}>
              {entry.isCompleted ? "Target completed" : "In progress"}
            </p>
          </div>
        </LeaderboardRow>
      ))}
    </div>
  );
}

/* ============================================================
   LIFETIME TASK LEADERBOARD
============================================================ */
interface TaskLeaderboardProps {
  taskId: string;
  unit: string;
}

function TaskLeaderboard({ taskId, unit }: TaskLeaderboardProps) {
  const { data: leadership, isLoading, isError } = useTaskLeadership(taskId);

  console.log("TASK LEADERSHIP////////////////////////:", leadership);

  if (isLoading)
    return (
      <p className={`py-8 text-center ${theme.muted}`}>
        Loading leaderboard...
      </p>
    );
  if (isError)
    return (
      <p className={`py-8 text-center ${theme.error}`}>
        Failed to load leaderboard.
      </p>
    );
  if (!leadership || leadership.length === 0)
    return (
      <p className={`py-8 text-center ${theme.muted}`}>
        No progress recorded yet.
      </p>
    );

  return (
    <div className="flex flex-col gap-3">
      {leadership.map((entry: any, index: any) => {
        
        return(<LeaderboardRow
          key={entry.userId}
          index={index}
          right={
            <span className="font-semibold text-white">
              {Number(entry.completedValue)} {unit}
            </span>
          }
        >
          <p className="font-medium text-white">
            {entry.username ?? "Unknown user"}
          </p>
        </LeaderboardRow>)
})}
    </div>
  );
}

/* ============================================================
   ACTIVITY LEADERBOARD
============================================================ */
interface ActivityLeaderboardProps {
  activityId: string;
}

function ActivityLeaderboard({ activityId }: ActivityLeaderboardProps) {
  const {
    data: leadership,
    isLoading,
    isError,
  } = useActivityLeadership(activityId);

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useCurrentUser();

  /* ==================== STATES ==================== */
  if (isLoading || userLoading)
    return (
      <p className={`py-8 text-center ${theme.muted}`}>
        Loading leaderboard...
      </p>
    );

  if (isError || userError)
    return (
      <p className={`py-8 text-center ${theme.error}`}>
        Failed to load leaderboard.
      </p>
    );

  if (!leadership || leadership.length === 0)
    return (
      <p className={`py-8 text-center ${theme.muted}`}>
        No activity progress recorded today.
      </p>
    );

  /* ==================== RENDER ==================== */
  return (
    <div className="flex flex-col gap-3">
      {leadership.map((entry: any, index: number) => {
        const isYou = entry.userId === user?.id;
        const pct = Number(entry.completionPercentage).toFixed(0);

        return (
          <LeaderboardRow
            key={entry.userId}
            index={index}
            isYou={isYou}
            right={
              <div className="text-right">
                <p
                  className={`font-semibold ${
                    isYou ? "text-blue-300" : "text-white"
                  }`}
                >
                  {pct} tasks completed
                </p>
                {entry.completed && (
                  <p className={`text-xs ${theme.success}`}>✓ Completed</p>
                )}
              </div>
            }
          >
            <div>
              <p className="flex items-center gap-2 font-medium text-white">
                {entry.username}
                {isYou && (
                  <span className="rounded-full border border-blue-300/40 bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    You
                  </span>
                )}
              </p>
              <p className={`text-xs ${theme.muted}`}>
                {entry.completedTasks}/{entry.totalTasks} tasks
              </p>
            </div>
          </LeaderboardRow>
        );
      })}
    </div>
  );
}