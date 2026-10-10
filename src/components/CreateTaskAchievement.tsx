"use client";

import { useState } from "react";
import { useCreateTaskAchievement } from "@/src/hooks/useAchievements";
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



// ---------------------------------------------------------------------------
// Name → Icon lookup map (use this when rendering from DB)
// ---------------------------------------------------------------------------
export const achievementIcons = {
  // Achievements
  Trophy,
  Crown,
  Medal,
  Award,
  Star,
  Sparkles,
  Sparkle,
  Gem,
  Diamond,
  BadgeCheck,
  CheckCircle,
  CheckCircle2,
  ThumbsUp,

  // Fitness
  Dumbbell,
  Activity,
  Bike,
  Footprints,
  Mountain,
  Heart,
  Flame,
  Timer,
  Apple,
  Droplet,
  Beef,
  Salad,

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

  // Wealth & Career
  DollarSign,
  Coins,
  PiggyBank,
  Wallet,
  Briefcase,
  Building,
  Key,

  // Social
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
  Sunrise,
  Sunset,
  Moon,
  CloudMoon,
  CloudRain,
  Snowflake,
  Trees,
  TreeDeciduous,
  Bird,
  Fish,
  Bug,
  PawPrint,

  // Time & Consistency
  Calendar,
  CalendarCheck,
  CalendarDays,
  Clock,
  Hourglass,
  Watch,
  AlarmClock,
  Repeat,
  RefreshCw,
  RotateCw,

  // Energy & Power
  Zap,
  Bolt,
  Battery,
  BatteryFull,
  BatteryCharging,
  Power,
  Plug,
  PlugZap,

  // Goals & Focus
  Target,
  Crosshair,
  Focus,
  Eye,
  Telescope,
  Flag,
  FlagTriangleRight,
  Milestone,

  // Misc
  Shield,
  Anchor,
  Bell,
  BellRing,
};


/* ============================================================
   🎨 CENTRAL THEME — change colors here
============================================================ */
const theme = {
  borderGradient: "bg-gradient-to-b from-white via-zinc-400 to-zinc-700",
  borderWidth: "p-[2px]",
  borderRadius: "rounded-3xl",

  formBg: "bg-zinc-950",
  formInnerRadius: "rounded-[calc(1.5rem-2px)]",

  gradientText:
    "bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent",
  labelText: "text-zinc-400",

  input:
    "bg-zinc-900/70 border border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500/50",

  primaryBtn:
    "bg-gradient-to-b from-white to-zinc-300 text-zinc-900 hover:from-white hover:to-white",

  success: "text-emerald-400",
  error: "text-red-400",
  muted: "text-zinc-500",
};

interface Props {
  taskId: string;
}
type IconType = "DEFAULT" | "PREBUILT" | "EMOJI" | "CUSTOM";
type ModalType = "EMOJI" | "ICON"

export default function CreateTaskAchievement({ taskId }: Props) {
  const createAchievement = useCreateTaskAchievement(taskId);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [totalValue, setTotalValue] = useState(0);
  const [unit, setUnit] = useState("");
  const [iconType, setIconType] = useState<IconType>("DEFAULT");
  const [iconValue, setIconValue] = useState("");
  const [modal, setModal] = useState<ModalType>("ICON");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createAchievement.mutate({
      title,
      totalValue,
      unit,
      description,
      iconType,
      iconValue,
    });
  };

  return (
    /* Gradient border wrapper */
    <div
      className={`${theme.borderWidth} ${theme.borderRadius} ${theme.borderGradient}`}
    >
      <form
        onSubmit={handleSubmit}
        className={`space-y-4 p-6 ${theme.formBg} ${theme.formInnerRadius}`}
      >

        <div className="flex items-center justify-between">
        <h2 className={`text-lg font-semibold ${theme.gradientText}`}>
          Create Achievement
        </h2>

        <div>

        <button
          type="submit"
          disabled={createAchievement.isPending}
          className={`w-full rounded-xl px-4 py-2.5 text-sm font-semibold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 ${theme.primaryBtn}`}
        >
          {createAchievement.isPending ? "Creating..." : "Create achievement"}
        </button>

        {createAchievement.isSuccess && (
          <p className={`text-sm ${theme.success}`}>
            Achievement created successfully.
          </p>
        )}

        {createAchievement.isError && (
          <p className={`text-sm ${theme.error}`}>
            {createAchievement.error.message}
          </p>
        )}
        </div>

        </div>

        <div className="space-y-1">
          <label
            className={`text-xs font-medium uppercase tracking-wider ${theme.labelText}`}
          >
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Achievement name"
            className={`w-full rounded-xl px-3 py-2 text-sm outline-none transition ${theme.input}`}
          />
        </div>

        <div className="space-y-1">
          <label
            className={`text-xs font-medium uppercase tracking-wider ${theme.labelText}`}
          >
            Target value
          </label>
          <input
            type="number"
            value={totalValue}
            onChange={(e) => setTotalValue(Number(e.target.value))}
            placeholder="e.g 100"
            className={`w-full rounded-xl px-3 py-2 text-sm outline-none transition ${theme.input}`}
          />
        </div>

        <div className="space-y-1">
          <label
            className={`text-xs font-medium uppercase tracking-wider ${theme.labelText}`}
          >
            Unit
          </label>
          <input
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            placeholder="e.g km, miles, reps..."
            className={`w-full rounded-xl px-3 py-2 text-sm outline-none transition ${theme.input}`}
          />
        </div>

        <div className="space-y-1">
          <label
            className={`text-xs font-medium uppercase tracking-wider ${theme.labelText}`}
          >
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Achievement description"
            rows={3}
            className={`w-full resize-none rounded-xl px-3 py-2 text-sm outline-none transition ${theme.input}`}
          />
        </div>
        <div>
          <div className="flex justify-between">
            <h1
              className={`text-lg font-semibold mb-5 p-2 border-2 border-zinc-600 rounded-xl ${
                modal === "ICON" ? "bg-zinc-600" : ""
              }`}
              onClick={() => setModal("ICON")}
            >
              Select Icons
            </h1>
            <h1
              className={`text-lg font-semibold mb-5 p-2 border-2 border-zinc-600 rounded-xl ${
                modal === "EMOJI" ? "bg-zinc-600" : ""
              }`}
              onClick={() => setModal("EMOJI")}
            >
              Select Emojis
            </h1>
          </div>
          {modal === "EMOJI" && (
            <div className="space-y-6">
              {emojiSections.map((section) => (
                <div key={section.label}>
                  {/* Section label */}
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    {section.label}
                  </h3>

                  {/* Icons grid */}
                  <div className="grid grid-cols-5 gap-2">
                    {section.emojis.map(({ name, emoji }) => {
                      const selected =
                        iconType === "EMOJI" && iconValue === name;

                      return (
                        <button
                          key={name}
                          type="button"
                          onClick={() => {
                            setIconType("EMOJI");
                            setIconValue(name);
                          }}
                          className={`
                flex h-12 w-12 items-center justify-center
                rounded-xl border transition
                ${
                  selected
                    ? "border-white bg-zinc-700"
                    : "border-zinc-800 bg-zinc-900 hover:bg-zinc-800"
                }
              `}
                        >
                          {emoji}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          {modal === "ICON" && (
            <div className="space-y-6">
              {iconSections.map((section) => (
                <div key={section.label}>
                  {/* Section label */}
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    {section.label}
                  </h3>

                  {/* Icons grid */}
                  <div className="grid grid-cols-5 gap-2">
                    {section.icons.map(({ name, Icon }) => {
                      const selected =
                        iconType === "PREBUILT" && iconValue === name;

                      return (
                        <button
                          key={name}
                          type="button"
                          onClick={() => {
                            setIconType("PREBUILT");
                            setIconValue(name);
                          }}
                          className={`
                flex h-12 w-12 items-center justify-center
                rounded-xl border transition
                ${
                  selected
                    ? "border-white bg-zinc-700"
                    : "border-zinc-800 bg-zinc-900 hover:bg-zinc-800"
                }
              `}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div></div>
      </form>
    </div>
  );
}
